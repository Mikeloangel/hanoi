import {Hanoi} from './hanoi.js'

const data = {
    containerSelector: '.hanoi-container',
    towerTemplateSelector: '#tower' 
}

const generateBtn = document.querySelector('.btn-generate');

const hanoi = new Hanoi(data);
hanoi.init(4);

generateBtn.addEventListener('click', e => hanoi.init(Math.floor(Math.random()*4+3)))