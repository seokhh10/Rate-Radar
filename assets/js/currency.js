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

    fetch(requestUrl, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            results.innerHTML = '';

         // Repeat rates data
         for (const currencyCode in data.rates) {
            const exchangeRate = data.rates[currencyCode];
            
            // Create card Element
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
    })
    .catch(function(error) {
        console.error('Error:', error);
        
    });
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