const textInput = document.getElementById('text-input');
const fetchButton = document.getElementById('fetch-button');
const results = document.getElementById('results')

// Error Modal Elements
const errorModal = document.getElementById("errorModal");
const closeBtn = document.getElementById("closeBtn");

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

function getGeckoApi(event) {
    const options = {
        method: 'GET',
        headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-JRFGKiLZjLqxhCoT7of1Kng2' }
    };
    const cryptoName = textInput.value;
    const requestUrl = `https://api.coingecko.com/api/v3/coins/${cryptoName}`;


    fetch(requestUrl, options)
        .then(function (response) {
            if (!response.ok) {
                console.log('API request failed with status:', response.status);
                errorModal.style.display = "block";
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            displayCrypto(data);

        }
        );
}

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
    const favoriteBtn = document.createElement('button');


    //Add the title and price of the coin to the html elements
    title.textContent = crypto.name;
    price.textContent = `Price (USD): ${crypto.market_data.current_price.usd.toLocaleString("en-US", {
        style: "currency",
        maximumFractionDigits: 10,
        currency: "USD"
    })}`;

    //Favorite button behavior
    favoriteBtn.textContent = 'Add to favorites';
    favoriteBtn.setAttribute('data-coin-id', crypto.id);
    favoriteBtn.setAttribute('class', 'card-footer-item button is-warning');
    favoriteBtn.onclick = function () {
        let favoriteCoins = readCoinsFromStorage();
        favoriteCoins.push(crypto.id);
        saveCoinsToStorage(favoriteCoins);
    }

    //Set the Bulma classes and attributes to style the content
    card.setAttribute('class', 'card');
    header.setAttribute('class', 'card-header');
    title.setAttribute('class', 'card-header-title');
    cardImg.setAttribute('class', 'card-header-icon');
    img.setAttribute('src', crypto.image.small);
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
    footer.appendChild(favoriteBtn);
    card.appendChild(header);
    card.appendChild(content);
    card.appendChild(footer);
    results.appendChild(card);

}

function fetchButtonHandler(event) {
    event.preventDefault();
    getGeckoApi();
}


fetchButton.addEventListener('click', fetchButtonHandler);

closeBtn.onclick = function () {
    errorModal.style.display = "none";
};