import {Hanoi} from './hanoi.js'

const data = {
    containerSelector: '.hanoi-container',
    debug: true,
    debudSelector : '.debugarea'
}

const generateBtn = document.querySelector('.btn-generate');

const hanoi = new Hanoi(data);
hanoi.init(4);

function initHanoi(h,levels){
  h.init(levels);
}

generateBtn.addEventListener('click', e => initHanoi(hanoi,Math.floor(Math.random()*4+3)))
