import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

Notiflix.Notify.init();
const DEBOUNCE_DELAY = 300;

const countrySearch = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

countrySearch.addEventListener('input', debounce(search, DEBOUNCE_DELAY));


function search(evt) {

    const countryName = evt.target.value.trim();


    if (countryName.length !== 0) {
        fetchCountries(countryName)
        .then(setCountries)
        .catch(errorInFetch);  
    }
      
};


function setCountries(name){

list.innerHTML = '';
info.innerHTML = '';


// if 1 country
if(name.status === 404){

Notiflix.Notify.failure('Oops, there is no country with that name');


} else if(name.length > 10){

list.innerHTML = '';
info.innerHTML = '';


Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");



} else if(name.length <= 10 && name.length >= 2){

info.innerHTML = '';

setTwoTenCountries(name)





} else if(name.length = 1){

list.innerHTML = '';

setOneCountrie(name)



}
}


// if 2-10 countries

function setTwoTenCountries(array){

const listOfCountries = array.map((array) => {
return `<li class="country-item"><img class="flag-image" src="${array.flags.svg}"  alt="${array.flags.alt}" width = "40"> 
</img>${array.name.official}</li>`}).join('');


return list.innerHTML = listOfCountries;
}


// if 1 countrie


function setOneCountrie(arrayCountry){


return info.innerHTML = 
`<div class="info-container">
    <img class="flag-image" src="${arrayCountry[0].flags.svg}" alt="${arrayCountry[0].flags.alt}" width="40"></img>
    <h1 class="title">${arrayCountry[0].name.official}</h1>
    </div>
    <ul class="list">
    <li class="list-item"><p><b>Capital:</b> ${arrayCountry[0].capital[0]}</p></li>
    <li class="list-item"><p><b>Population:</b> ${arrayCountry[0].population}</p></li>
    <li class="list-item"><p><b>Languages:</b> ${Object.values(arrayCountry[0].languages).join(', ')}</p></li>
    </ul>`
}







