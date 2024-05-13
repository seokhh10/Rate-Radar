const cryptoColumn = document.getElementById('crypto-column');
const currencyColumn = document.getElementById('currency-column');

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
                displayCrypto(crypto);
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
            displayCurrencyInfo(data);
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
};

function displayCrypto(crypto) {

    //Create html elements
    const card = document.createElement('div');
    const header = document.createElement('div');
    const title = document.createElement('p');
    const cardImg = document.createElement('div');
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const content = document.createElement('div');
    const price = document.createElement('div');
    const footer = document.createElement('div');
    const removeBtn = document.createElement('button');

    //Add the title and price of the coin to the html elements
    title.textContent = crypto.name;
    price.textContent = `Price (USD): ${crypto.current_price.toLocaleString("en-US", {
        style: "currency",
        maximumFractionDigits: 10,
        currency: "USD"
    })}`;

    //Remove button behavior
    removeBtn.textContent = 'Remove from favorites';
    removeBtn.setAttribute('data-coin-id', crypto.id);
    removeBtn.setAttribute('class', 'card-footer-item button is-warning');
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

    //Set the Bulma classes and attributes to style the content
    card.setAttribute('class', 'card');
    header.setAttribute('class', 'card-header');
    title.setAttribute('class', 'card-header-title');
    cardImg.setAttribute('class', 'card-header-icon');
    img.setAttribute('src', crypto.image);
    figure.setAttribute('class', 'image is-16x16');
    content.setAttribute('class', 'card-content');
    price.setAttribute('class', 'content');
    footer.setAttribute('class', 'card-footer');


    //Append the elements
    figure.appendChild(img);
    cardImg.appendChild(figure);
    header.appendChild(cardImg);
    header.appendChild(title);
    content.appendChild(price);
    footer.appendChild(removeBtn);
    card.appendChild(header);
    card.appendChild(content);
    card.appendChild(footer);
    cryptoColumn.appendChild(card);
}

function displayCurrencyInfo(data) {
    // results.innerHTML = '';

    // Repeat rates data
    for (const currencyCode in data.rates) {
        const exchangeRate = data.rates[currencyCode];

        // card Element
        const card = document.createElement('div');
        const header = document.createElement('div');
        const content = document.createElement('div');
        const footer = document.createElement('div');
        const removeBtn = document.createElement('button');

        card.classList.add('card');
        header.classList.add('card-header');
        content.classList.add('card-content');
        footer.classList.add('card-footer');

        header.innerHTML = `
                    <p class='card-header-title'>${currency}</p>
                    `;
        content.innerHTML = `
                    <div class='content'>${exchangeRate}</div>
                    `;
        removeBtn.textContent = 'Remove from favorites';
        removeBtn.setAttribute('data-currency-code', currencyCode);
        removeBtn.setAttribute('class', 'card-footer-item button is-warning');
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
        footer.appendChild(removeBtn);
        card.appendChild(header);
        card.appendChild(content);
        card.appendChild(footer);
        // Append the card to the currency section
        currencyColumn.appendChild(card);
    };
};

if (readCoinsFromStorage().length !== 0) {
    getGeckoApi();
}

if (readCurrenciesFromStorage().length !== 0) {
    fetchCurrencyInfo();
}