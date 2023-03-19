// import

import Notiflix from 'notiflix';

// refs

form = document.querySelector('.form');
inputDelay = document.querySelector('[name = "delay"]');
inputStep = document.querySelector('[name = "step"]');
inputAmount = document.querySelector('[name = "amount"]');

// add event listener

form.addEventListener('submit', evt => {
  evt.preventDefault();

  let step = Number(inputDelay.value);

  for (let i = 1; i <= Number(inputAmount.value); i += 1) {
    createPromise(i, step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })

      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    step += Number(inputStep.value);
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
