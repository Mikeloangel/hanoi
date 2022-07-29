import { LogicHanoi } from "./logichanoi.js";

export class Hanoi extends LogicHanoi {
  constructor(data) {
    super(data);
    this._hanoiContainer = document.querySelector(data.containerSelector);

    this._grTowers = Array.from(this._hanoiContainer.querySelectorAll('.tower'));
    this._grBloks = Array.from(this._hanoiContainer.querySelectorAll('.tower__block'));

    this._setEventListeners();
  }

  _setEventListeners() {
    document.addEventListener('keydown', e => this._handleKeyPress(e));
  }

  _handleKeyPress(e) {
    switch (e.key) {
      case 'ArrowLeft':
        this._moveHand(-1);
        break;
      case 'ArrowRight':
        this._moveHand(1);
        break;
      case 'ArrowUp':
        this._pickupItem();
        break;
      case 'ArrowDown':
        this._dropItem();
        break;
    }
    this._dbg();
    this._grRevalidate();
  }

  _moveHand(direction){
    super._moveHand(direction);

    if(this._handItem != 0)
      this._updateHandItem();

  }

  _grRevalidate(){
    this._towers.forEach( (tower,ti) => {
      tower.forEach( (block) => {
        if(block != this._handItem)
          this._grTowers[ti].querySelector('.tower__blocks').prepend(this._grBloks[block-1])
      });
    })

    this._updateHand();
    this._updateHandItem();
  }

  _updateHandItem(){
    if(this._handItem!=0)
      this._grTowers[this._handPosition].querySelector('.hand__block').append(this._grBloks[this._handItem-1]);
  }

  _updateHand(){
    this._grTowers.forEach( (tower,index) =>{
      if(this._handPosition===index){
        tower.querySelector('.tower__hand').classList.add('tower__hand-active');
      }else{
        tower.querySelector('.tower__hand').classList.remove('tower__hand-active');
      }
  });
  }

  _pickupItem(){
    super._pickupItem();
    this._updateHandItem();
  }

  init(level=6){
    super.init(level);

    // hidding unused blocks
    this._grBloks.forEach((block,index) => {
      if(index < this._level){
        block.classList.add('tower__block_hidden');
      }else{
        block.classList.remove('tower__block_hidden');
      }
    });

    //moving using blocks
    this._grRevalidate();

    //setting up hand



  }

}
