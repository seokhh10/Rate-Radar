const textInput = document.getElementById('text-input');
const fetchButton = document.getElementById('fetch-button');
const results = document.getElementById('results')

function fetchCurrencyInfo(event) {
    const options = {
        method: 'GET',
        headers: { accept: 'application/json'}
    };
    const currencyName = textInput.value;
    const requestUrl = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=d463c482a136446b91438de5e6d4f46c&symbols=${currencyName}`;

    fetch(requestUrl, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            results.innerHTML = '';

        }

function fetchButtonHandler(event) {
    event.preventDefault();
    fetchCurrencyInfo();
}

fetchButton.addEventListener('click', fetchButtonHandler);