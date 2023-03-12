// imports

import throttle from 'lodash.throttle';

// refs setting

const formSelected = document.querySelector('.feedback-form');

const inputSelected = document.querySelector('[type="email"]');

const textAreaSelected = document.querySelector('[name="message"]');

// setting a local storage key

const LOCAL_STORAGE_DATA = 'feedback-form-state';

// event listener form

localStorageToFormFill();

const data = {};

formSelected.addEventListener('input', throttle(inputClicked, 500));

function inputClicked(event) {
  data.email = inputSelected.value;

  data.massage = textAreaSelected.value;

  localStorage.setItem(LOCAL_STORAGE_DATA, JSON.stringify(data));
}

// returning data from local storage to inputs

function localStorageToFormFill() {
  const localStorageDataParsed = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_DATA)
  );

  if (localStorageDataParsed) {
    inputSelected.value = localStorageDataParsed.email;

    textAreaSelected.value = localStorageDataParsed.massage;
  }
}

// cleaning inputs fields after clicking submit and console log data

formSelected.addEventListener('submit', submitFormHandler);

function submitFormHandler(event) {
  console.log(data);

  event.target.reset();

  localStorage.removeItem(LOCAL_STORAGE_DATA);

  // prevent default function calling

  noDefault(event);
}

// prevent default function setting

function noDefault(evt) {
  evt.preventDefault();
}
