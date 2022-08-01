import { Hanoi } from './hanoi.js';
import { Popup } from './popup.js';

const hanoiSettings = {
  containerSelector: '.hanoi-container',
  counterSelector: '.counter__selector',
  counterLevel: '.counter__level',
  debug: false,
  // debug: true,
  debudSelector: '.debugarea',
  level: 3,
}

const hanoiStateFunctions = {
  onStart,
  onLevelCompleted,
  onGameCompleted,
}


const popupSettings = {
  onStart: {
    popupSelector: '.popup__onstart',
    popupOpenClass: 'popup__open'
  }
}

const popups = {
  popupOnStart: new Popup(popupSettings.onStart)
}

const hanoi = new Hanoi(hanoiSettings, hanoiStateFunctions);
hanoi.init();


/**
 * Hanoi state callback functions
 */
function onStart() {
  popups.popupOnStart.openPopup();
  console.log('Welcome to the game');
}


function onLevelCompleted() {
  console.log(`Welcome to level ${this._level}`);
}


function onGameCompleted() {
  console.log('WIN!')
  this.init();
}



const generateBtn = document.querySelector('.btn-startover');
generateBtn.addEventListener('click', e => hanoi.init());
