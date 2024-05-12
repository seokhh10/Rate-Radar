const cryptoColumn = document.getElementById('crypto-column');

function getGeckoApi() {
    const options = {
        method: 'GET',
        headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-JRFGKiLZjLqxhCoT7of1Kng2' }
    };
    const requestUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1';

    fetch(requestUrl, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            for (const crypto of data) {

                //Creating elements, card, header, img, and price
                const card = document.createElement('div');
                const header = document.createElement('header');
                const title = document.createElement('p');
                const cardImg = document.createElement('div');
                const figure = document.createElement('figure');
                const img = document.createElement('img');
                const content = document.createElement('div');
                const price = document.createElement('div');

                title.textContent = crypto.name;
                card.setAttribute('class', 'card');
                header.setAttribute('class', 'card-header');
                title.setAttribute('class', 'card-header-title');
                cardImg.setAttribute('class', 'card-header-icon');
                img.setAttribute('src', crypto.image);
                figure.setAttribute('class', 'image is-32x32');
                content.setAttribute('class', 'card-content');
                price.setAttribute('class', 'content');
                price.textContent = `Price (USD): ${crypto.current_price.toLocaleString("en-US", {
                    style: "currency",
                    maximumFractionDigits: 10,
                    currency: "USD"
                })}`;


                figure.appendChild(img);
                cardImg.appendChild(figure);
                header.appendChild(cardImg);
                header.appendChild(title);
                content.appendChild(price);
                card.appendChild(header);
                card.appendChild(content);
                cryptoColumn.appendChild(card);
            }
        });
}

getGeckoApi();

// Currency API start here

function fetchCurrencyInfo() {
    // const apiKey = 'd463c482a136446b91438de5e6d4f46c';
    const apiUrl = 'https://api.currencyfreaks.com/v2.0/rates/latest?apikey=d463c482a136446b91438de5e6d4f46c&symbols=PKR,GBP,EUR,USD,MXN';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Display currency information
            const currencies = data.rates;
            const rightColumn = document.querySelector('.right-column');
            console.log(data);

            for (const currency in currencies) {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <h2>${currency}</h2>
                    <p>${currencies[currency]}</p>
                `;
                rightColumn.appendChild(card);
            }
        })
        .catch(error => console.error('Error fetching currency data:', error));
}

// Call the function to currency
fetchCurrencyInfo();


