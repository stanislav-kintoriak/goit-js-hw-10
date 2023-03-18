// imports

import Notiflix from 'notiflix';

import flatpickr from 'flatpickr';

// flatpicr styles
import 'flatpickr/dist/flatpickr.min.css';

// settings for flatpicr

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

// refs

buttonStartTimer = document.querySelector('button');
daysCounter = document.querySelector('[data-days]');
hoursCounter = document.querySelector('[data-hours]');
minutesCounter = document.querySelector('[data-minutes]');
secondsCounter = document.querySelector('[data-seconds]');
let timerID = null;
let dateFromUser = 0;

buttonStartTimer.disabled = true;

buttonStartTimer.addEventListener('click', onButtonStartClick);

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() > Date.now()) {
      buttonStartTimer.disabled = false;

      dateFromUser = selectedDates[0].getTime();
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
});

function onButtonStartClick(){
  timerID = setInterval(() => {
    let timeRemained = (dateFromUser - Date.now());

    if (timeRemained >= 0) {
      buttonStartTimer.disabled = true;

      const time = convertMs(timeRemained);

      addLeadingZero(timeRemained);

      daysCounter.textContent = addLeadingZero(time.days);
      hoursCounter.textContent = addLeadingZero(time.hours);
      minutesCounter.textContent = addLeadingZero(time.minutes);
      secondsCounter.textContent = addLeadingZero(time.seconds);
    } else {
      clearInterval(timerID);
    }
  }, 1000);
}

// coverting single time to 2 symbols time format

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// getting time

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
