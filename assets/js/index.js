const cryptoColumn = document.getElementById('crypto-column');

function getGeckoApi() {
    const options = {
        method: 'GET',
        headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-JRFGKiLZjLqxhCoT7of1Kng2' }
    };
    const requestUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1';

    fetch(requestUrl, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            for (const crypto of data) {

                // Creating elements, card, header, img, and price
                const card = document.createElement('div');
                const header = document.createElement('h2');
                const img = document.createElement('img');
                const price = document.createElement('div');

                card.setAttribute('class', 'card left');
                header.textContent = crypto.name;
                img.setAttribute('src', crypto.image);
                price.textContent = `Price (USD): ${crypto.current_price.toLocaleString("en-US", {
                    style: "currency",
                    maximumFractionDigits: 10,
                    currency: "USD"
                })}`;

                card.appendChild(header);
                card.appendChild(img);
                card.appendChild(price);
                cryptoColumn.appendChild(card);
            }
        });
}

getGeckoApi();