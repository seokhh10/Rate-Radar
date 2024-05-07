fetch("https://api.currencyfreaks.com/v2.0/supported-currencies")
.then (response => response.json())
.then (data => console.log(data))
.catch(error => console.error(error));

