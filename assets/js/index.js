const cryptoColumn = document.getElementById('crypto-column');

//Fetch the top 5 coins by market cap from the Gecko API
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
                displayCrypto(crypto);
            }
        });
}

// Currency API start here
function fetchCurrencyInfo() {
    // const apiKey = 'd463c482a136446b91438de5e6d4f46c';
    const apiUrl = 'https://api.currencyfreaks.com/v2.0/rates/latest?apikey=d463c482a136446b91438de5e6d4f46c&symbols=PKR,GBP,EUR,USD,MXN';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Display currency information
            const currencies = data.rates;
            const rightColumn = document.getElementById('currency-column');
            console.log(data);

            for (const currency in currencies) {
                const card = document.createElement('div');
                const header = document.createElement('header');
                const content = document.createElement('div');
                card.classList.add('card');
                header.classList.add('card-header');
                content.classList.add('card-content');
                header.innerHTML = `
                    <p class='card-header-title'>${currency}</p>
                    `;
                content.innerHTML = `
                    <div class='content'>${currencies[currency]}</div>
                    `;
                card.appendChild(header);
                card.appendChild(content);
                rightColumn.appendChild(card);
            }
        })
        .catch(error => console.error('Error fetching currency data:', error));
}

//Create elements and display them
function displayCrypto(crypto) {

    //Create html elements
    const card = document.createElement('div');
    const header = document.createElement('header');
    const title = document.createElement('p');
    const cardImg = document.createElement('div');
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const content = document.createElement('div');
    const price = document.createElement('div');

    //Add the title and price of the coin to the html elements
    title.textContent = crypto.name;
    price.textContent = `Price (USD): ${crypto.current_price.toLocaleString("en-US", {
        style: "currency",
        maximumFractionDigits: 10,
        currency: "USD"
    })}`;

    //Set the Bulma classes and attributes to style the content
    card.setAttribute('class', 'card');
    header.setAttribute('class', 'card-header');
    title.setAttribute('class', 'card-header-title');
    cardImg.setAttribute('class', 'card-header-icon');
    img.setAttribute('src', crypto.image);
    figure.setAttribute('class', 'image is-16x16');
    content.setAttribute('class', 'card-content');
    price.setAttribute('class', 'content');


    //Append the elements
    figure.appendChild(img);
    cardImg.appendChild(figure);
    header.appendChild(cardImg);
    header.appendChild(title);
    content.appendChild(price);
    card.appendChild(header);
    card.appendChild(content);
    cryptoColumn.appendChild(card);
}

//Call the fucntion to fetch coins
getGeckoApi();

// Call the function to currency
fetchCurrencyInfo();


