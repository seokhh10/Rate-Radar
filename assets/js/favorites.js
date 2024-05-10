const cryptoDiv = document.getElementById('crypto-div');

function saveCoinsToStorage(favoriteCoins) {
    localStorage.setItem('favoriteCoins', JSON.stringify(favoriteCoins));
}

function readCoinsFromStorage() {
    let favoriteCoins = JSON.parse(localStorage.getItem('favoriteCoins'));

    if (!favoriteCoins) {
        favoriteCoins = [];
    }

    return favoriteCoins;
}

function getGeckoApi() {
    const options = {
        method: 'GET',
        headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-JRFGKiLZjLqxhCoT7of1Kng2' }
    };
    let requestUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=';
    const favoriteCoins = readCoinsFromStorage();

    for (coin of favoriteCoins) {
        if (coin === favoriteCoins[0]) {
            requestUrl += coin.id;
        } else {
            requestUrl += `,${coin.id}`;
        };
    };
    console.log(requestUrl);

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
                const removeBtn = document.createElement('button');

                card.setAttribute('class', 'card left');
                header.textContent = crypto.name;
                img.setAttribute('src', crypto.image);
                price.textContent = `Price (USD): ${crypto.current_price.toLocaleString("en-US", {
                    style: "currency",
                    maximumFractionDigits: 10,
                    currency: "USD"
                })}`;

                removeBtn.textContent = 'Remove from favorites';
                removeBtn.setAttribute('data-coin-id', crypto.id);
                removeBtn.onclick = function () {
                    const coinId = this.getAttribute('data-coin-id');
                    const favoriteCoins = readCoinsFromStorage();

                    favoriteCoins.forEach((coin) => {
                        if (coin.id === coinId) {
                            favoriteCoins.splice(favoriteCoins.indexOf(coin), 1);
                        }
                    });

                    saveCoinsToStorage(favoriteCoins);
                }

                card.appendChild(header);
                card.appendChild(img);
                card.appendChild(price);
                card.appendChild(removeBtn);
                cryptoDiv.appendChild(card);
            }
        });
}

getGeckoApi();