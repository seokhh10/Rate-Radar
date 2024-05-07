const cryptoButton = document.querySelector('.toCrypto');
const currencyButton = document.querySelector('.toCurrency');
const favoritesButton = document.querySelector('.toFavorites');





cryptoButton.addEventListener("click", () => {
    location.href = "crypto.html";
});

currencyButton.addEventListener("click", () => {
    location.href = "currency.html";
});

favoritesButton.addEventListener("click", () => {
    location.href = "favorites.html";
});