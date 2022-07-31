import { LogicHanoi } from "./logichanoi.js";

export class Hanoi extends LogicHanoi {
  constructor(data) {
    super(data);

    this._hanoiContainer = document.querySelector(data.containerSelector);
    this._counterContainer = document.querySelector(data.counterSelector);
    this._levelContainer = document.querySelector(data.counterLevel)

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
  }

  /**
   * Reloads super method
   *
   * @param {Number} direction
   */
  _moveHand(direction) {
    super._moveHand(direction);
    this._grRevalidateHand();

    if (this._handItem != 0)
      this._grRevalidateHandItem();

  }

  /**
   * Redraws all tower blocks
   */
  _grRevalidateBlocks() {
    this._towers.forEach((tower, ti) => {
      tower.forEach((block) => {
        if (block != this._handItem)
          this._grTowers[ti].querySelector('.tower__blocks').prepend(this._grBloks[block - 1])
      });
    })
  }

  /**
   * Redraws hand item
   */
  _grRevalidateHandItem() {
    if (this._handItem != 0)
      this._grTowers[this._handPosition].querySelector('.hand__block').append(this._grBloks[this._handItem - 1]);
  }

  /**
   * Redraws hand itself
   */
  _grRevalidateHand() {
    this._grTowers.forEach((tower, index) => {
      if (this._handPosition === index) {
        tower.querySelector('.tower__hand').classList.add('tower__hand-active');
      } else {
        tower.querySelector('.tower__hand').classList.remove('tower__hand-active');
      }
    });
  }

  /**
   * Redraws counter
   */
  _grUpdateCounter() {
    this._counterContainer.textContent = this._move;
  }

  /**
   * Redraws level
   */
  _grUpdateLevel() {
    this._levelContainer.textContent = this._level;
  }

  /**
   * Revalidates all game items
   */
  _grRevalidateAll(){
    this._grRevalidateBlocks();
    this._grRevalidateHand();
    this._grRevalidateHandItem();
    this._grUpdateCounter();
    this._grUpdateLevel();
  }

  /**
   * Reloads super method and redraw hand item
   */
  _pickupItem() {
    super._pickupItem();
    this._grRevalidateHandItem();
  }

  /**
   * reloads super method and redraws blocks and hand item
   */
  _dropItem(){
    super._dropItem();
    this._grRevalidateBlocks();
    this._grRevalidateHandItem();
  }

  /**
   * Reloads super method and update counter
   */
  _addMove() {
    super._addMove();
    this._grUpdateCounter();
  }

  /**
   * Reloads super method and reinitialises blocks and redraws all
   */
  _nextLevel() {
    super._nextLevel();
    this._reInitBlocks();
    this._grRevalidateAll();
  }

  /**
   * Reinitilises blocks for a new level
   * hides unused blocks and show usefull blocks
   */
  _reInitBlocks() {
    this._grBloks.forEach((block, index) => {
      if (index < this._level) {
        block.classList.add('tower__block_hidden');
      } else {
        block.classList.remove('tower__block_hidden');
      }
    });
  }

  /**
   * Reload super method
   * reinitilise gameplay (start over)
   */
  init() {
    super.init();

    this._reInitBlocks();
    this._grUpdateCounter();
    this._grRevalidateAll();
  }
}
