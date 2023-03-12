// imports

import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// player initialization

const iframe = document.querySelector('iframe');

const player = new Player(iframe);

// setting a key for local storage

const LOCAL_STORAGE_VIDEO_TIME_KEY = 'videoplayer-current-time';

// function that add time to the local storage

const timeStorageUpdateFunction = throttle(function ({ seconds }) {
  localStorage.setItem(LOCAL_STORAGE_VIDEO_TIME_KEY, seconds);
}, 1000);

player.on('timeupdate', timeStorageUpdateFunction);

// function that returns time from local storage to iframe;

const localStorageSavedTime = localStorage.getItem(
  LOCAL_STORAGE_VIDEO_TIME_KEY
);

if (localStorageSavedTime) {
  player.setCurrentTime(localStorageSavedTime);
}
