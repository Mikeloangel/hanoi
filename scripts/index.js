import {hanoiSettings} from './data.js';
import {Hanoi} from './hanoi.js';

const generateBtn = document.querySelector('.btn-startover');

const hanoi = new Hanoi(hanoiSettings);
hanoi.init();


generateBtn.addEventListener('click', e => hanoi.init());
