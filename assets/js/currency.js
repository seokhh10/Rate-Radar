const textInput = document.getElementById('text-input');
const fetchButton = document.getElementById('fetch-button');
const results = document.getElementById('results')
const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

function fetchCurrencyInfo(event) {
    const options = {
        method: 'GET',
        headers: { accept: 'application/json'}
    };
    const currencyName = textInput.value;
    const requestUrl = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=d463c482a136446b91438de5e6d4f46c&symbols=${currencyName}`;

    //  local storage
    const storedData = localStorage.getItem(currencyName);
    if (storedData) {
        displayCurrencyInfo(JSON.parse(storedData));
    } else {
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
                localStorage.setItem(currencyName, JSON.stringify(data));
                displayCurrencyInfo(data);
            })
            .catch(function(error) {
                console.error('Error:', error);
            });
    }
}

function displayCurrencyInfo(data) {
    // results.innerHTML = '';

    // Repeat rates data
    for (const currencyCode in data.rates) {
        const exchangeRate = data.rates[currencyCode];
        
        // card Element
        const card = document.createElement('div');
        const header = document.createElement('h2');
        const price = document.createElement('div');
        

        // attributes of the card
        card.setAttribute('class', 'card');
        header.textContent = currencyCode;
        price.textContent = `Exchange Rate: ${exchangeRate}`;
        

        // Append elements to the card
        card.appendChild(header);
        card.appendChild(price);

        // Append the card to the results section
        results.appendChild(card);
    }
}

function fetchButtonHandler(event) {
    event.preventDefault();
    fetchCurrencyInfo();
}

btn.onclick = function() {
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
fetchButton.addEventListener('click', fetchButtonHandler);
