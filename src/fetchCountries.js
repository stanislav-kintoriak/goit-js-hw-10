// Тобі потрібні тільки наступні властивості:

// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages - масив мов

function fetchCountries(countryName) {
  return fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`)
  .then(response => response.json());
};

export { fetchCountries };



