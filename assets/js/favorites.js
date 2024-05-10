const cryptoDiv = document.getElementById('crypto-div');
const currencyDiv = document.getElementById('currency-div');

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

function readCurrenciesFromStorage() {
    let favoriteCurrencies = JSON.parse(localStorage.getItem('favoriteCurrencies'));

    if (!favoriteCurrencies) {
        favoriteCurrencies = [];
    }

    return favoriteCurrencies;
}

function saveCurrenciesToStorage(favoriteCurrencies) {
    localStorage.setItem('favoriteCurrencies', JSON.stringify(favoriteCurrencies));
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

function fetchCurrencyInfo(event) {
    const options = {
        method: 'GET',
        headers: { accept: 'application/json' }
    };

    let requestUrl = "https://api.currencyfreaks.com/v2.0/rates/latest?apikey=d463c482a136446b91438de5e6d4f46c&symbols=";
    const favoriteCurrencies = readCurrenciesFromStorage();

    for (currency of favoriteCurrencies) {
        if (currency === favoriteCurrencies[0]) {
            requestUrl += currency;
        } else {
            requestUrl += `,${currency}`;
        }

    }
    //  local storage
    // const storedData = localStorage.getItem(currencyName);
    // if (storedData) {
    //     displayCurrencyInfo(JSON.parse(storedData));
    fetch(requestUrl, options)
        .then(function (response) {
            console.log(response.status)

            if (response.status === 404) {
                modal.style.display = "block";
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // Save data to local storage
            // localStorage.setItem(currencyName, JSON.stringify(data));
            displayCurrencyInfo(data);
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
};

function displayCurrencyInfo(data) {
    // results.innerHTML = '';

    // Repeat rates data
    for (const currencyCode in data.rates) {
        const exchangeRate = data.rates[currencyCode];

        // card Element
        const card = document.createElement('div');
        const header = document.createElement('h2');
        const price = document.createElement('div');
        const removeBtn = document.createElement('button');

        // attributes of the card
        card.setAttribute('class', 'card');
        header.textContent = currencyCode;
        price.textContent = `Exchange Rate: ${exchangeRate}`;
        removeBtn.textContent = 'Remove from favorites';
        removeBtn.setAttribute('data-currency-code', currencyCode);
        removeBtn.onclick = function () {
            const currencyCode = this.getAttribute('data-currency-code');
            const favoriteCurrencies = readCurrenciesFromStorage();

            favoriteCurrencies.forEach((currency) => {
                if (currencyCode === currency) {
                    favoriteCurrencies.splice(favoriteCurrencies.indexOf(currency), 1);
                }
            });

            saveCurrenciesToStorage(favoriteCurrencies);
        };

        // Append elements to the card
        card.appendChild(header);
        card.appendChild(price);
        card.appendChild(removeBtn);
        // Append the card to the currency section
        currencyDiv.appendChild(card);
    };
};

getGeckoApi();

fetchCurrencyInfo();