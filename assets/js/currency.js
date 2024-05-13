const textInput = document.getElementById('text-input');
const fetchButton = document.getElementById('fetch-button');
const results = document.getElementById('results')
const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

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

function fetchCurrencyInfo(event) {
    const options = {
        method: 'GET',
        headers: { accept: 'application/json' }
    };
    const currencyName = textInput.value;
    const requestUrl = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=d463c482a136446b91438de5e6d4f46c&symbols=${currencyName}`;

    //  local storage
    fetch(requestUrl, options)
        .then(function (response) {
            console.log(response.status)

            if (response.status === 404) {
                modal.setAttribute('class', 'modal is-active');
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
}

function displayCurrencyInfo(data) {
    // results.innerHTML = '';

    // Repeat rates data
    for (const currencyCode in data.rates) {
        const exchangeRate = data.rates[currencyCode];

        const card = document.createElement('div');
        const header = document.createElement('div');
        const content = document.createElement('div');
        const footer = document.createElement('div');
        const favoriteBtn = document.createElement('button');

        card.classList.add('card');
        header.classList.add('card-header');
        content.classList.add('card-content');
        footer.classList.add('card-footer');

        header.innerHTML = `
                    <p class='card-header-title'>${currencyCode}</p>
                    `;
        content.innerHTML = `
                    <div class='content'>${exchangeRate}</div>
                    `;
        favoriteBtn.textContent = 'Add to Favorites';
        favoriteBtn.setAttribute('data-currency-code', currencyCode);
        favoriteBtn.setAttribute('class', 'card-footer-item button is-warning');
        favoriteBtn.onclick = function () {
            let favoriteCurrencies = readCurrenciesFromStorage();
            favoriteCurrencies.push(currencyCode);
            saveCurrenciesToStorage(favoriteCurrencies);
        };

        // Append elements to the card
        footer.appendChild(favoriteBtn);
        card.appendChild(header);
        card.appendChild(content);
        card.appendChild(footer);
        // Append the card to the currency section
        results.appendChild(card);
    };
}

function fetchButtonHandler(event) {
    event.preventDefault();
    fetchCurrencyInfo();
}

btn.onclick = function () {
    modal.setAttribute('class', 'modal');
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.setAttribute('class', 'modal');
    }
}
fetchButton.addEventListener('click', fetchButtonHandler);
