// refs setting

const startBtn = document.querySelector('[data-start]');

const stopBtn = document.querySelector('[data-stop]');

const bodyInAction = document.querySelector('body');

let timeoutID = null;

// On setInterval after click on button start:
// - setInterval;
// -body background color random;
// - start button disabled.

startBtn.addEventListener('click', OnButtonStartClick);

// clearInterval after click on stop + return active to btn start;

stopBtn.addEventListener('click', onButtonStopClick);

// functions in unset;

stopBtn.disabled = true;

function OnButtonStartClick() {
  timeoutID = setInterval(actionsAfterClick, 1000);
}

function actionsAfterClick() {
  stopBtn.disabled = false;

  startBtn.disabled = true;

  bodyInAction.style.backgroundColor = getRandomHexColor();
}

function onButtonStopClick() {
  clearInterval(timeoutID);

  stopBtn.disabled = true;

  startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
