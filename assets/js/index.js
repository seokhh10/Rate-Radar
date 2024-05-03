function fetchCurrencyRates() {
    const apiKey = 'd463c482a136446b91438de5e6d4f46c';
    const apiUrl = 'https://api.currencyfreaks.com/latest'


fetch(apiUrl + '?apikey=' + apiKey)
.then(Response => Response.json())
.then(data => {
    const rates = data.rates;
    console.log(rates) 
    const leftDataElement = document.getElementById('left-data');
                    if (leftDataElement) { // Check if element exists
                        for (const currency in rates) {
                            const listItem = document.createElement('li');
                            listItem.textContent = `${currency}: ${rates[currency]}`;
                            leftDataElement.appendChild(listItem);
                        }
                    } else {
                        console.error('Left data element not found');
                    }
                })
                .catch(error => console.error('Error fetching data:', error));
                
        }

        // Call the function to fetch currency rates when the page loads
        fetchCurrencyRates();

       