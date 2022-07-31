export class LogicHanoi {
  /**
   *
   * @param {Object} data
   */
  constructor(data) {
    // structure
    // three towers represented as an array of stacks (arrays)
    this._towers = [[], [], []]
    // position of hand 0,1 or 2
    this._handPosition = 1;
    // block size picked in hand
    this._handItem = 0;
    // current level (3,4,5 or 6)
    this._level = data.level;
    //moves counter
    this._move = 0;

    /**
       * DEBUG AREA
       */
    this._isDebug = data.debug;
    this._debugArea = document.querySelector(data.debudSelector);
  }

  /**
   *
   * Shows debug information in debug container
   * towers structure to visual type
   */
  _dbg() {
    if (!this._isDebug) {
      this._debugArea.innerHTML = ''
      return;
    }
    var res = `<p>DEBUG AREA:</p>
      <table style="border:1px solid black;width:100%;">`

    res += `<tr>
      <td>*</td>
      <td>${this._handPosition === 0 ? this._handItem : ' '}</td>
      <td>${this._handPosition === 1 ? this._handItem : ' '}</td>
      <td>${this._handPosition === 2 ? this._handItem : ' '}</td>
      </tr>`;

    for (let i = 5; i >= 0; i--)
      res += `<tr style="border:1px solid black;">
          <td>${i}</td>
          <td>${this._towers[0][i] === undefined ? '.' : this._towers[0][i]}</td>
          <td>${this._towers[1][i] === undefined ? '.' : this._towers[1][i]}</td>
          <td>${this._towers[2][i] === undefined ? '.' : this._towers[2][i]}</td>
      </tr>`

    res += `</table>
      <p>Level: ${this._level} <br>Moves: ${this._move}</p>
      `;

    this._debugArea.innerHTML = res;
  }

  /**
   * Adds a block to the tower,
   * returns true if block added and fits properly
   * returns false if we are trying to insert block bigger then topmost in the tower
   * @param {Number} towerN
   * @param {Number} blockSize
   * @returns {Boolean}
   */
  _towerSetBlock(towerN, blockSize) {
    if (this._towers[towerN].at(-1) < blockSize) return false;
    this._towers[towerN].push(blockSize);
    return true;
  }

  /**
   * Check if towers are in a winning condition
   * if only one tower has blocks on it then returns true
   *
   * @returns {Boolean}
   */
  _checkTowers() {
    let i = 0;
    this._towers.forEach(e => {
      if (e.some(el => el > 0) || e.length != 0) i++;
    });

    if (i === 1) return true;
    return false;
  }

  /**
   * Moves hand to next or previous tower
   * any positive number moves right
   * any negative number moves left
   * @param {Number} direction
   */
  _moveHand(direction) {
    this._handPosition += direction;
    if (this._handPosition > 2) this._handPosition = 0;
    if (this._handPosition < 0) this._handPosition = 2;
    this._addMove();
  }

  /**
   * Picks item from current tower
   * return false if hand already has item
   * return true after poping out top element to the handItem
   * @returns {Boolean}
   */
  _pickupItem() {
    if (this._handItem != 0) return false;

    this._handItem = this._towers[this._handPosition].pop();
    if (this._handItem === undefined) this._handItem = 0;
    return true;
  }

  /**
   * Drops item (if exists in hand) to the current tower
   * Checks if level completed than starts new level
   * @returns {Void}
   */
  _dropItem() {
    if (this._handItem === 0) return;

    if (this._towerSetBlock(this._handPosition, this._handItem)) {
      this._handItem = 0;

      if (this._checkTowers()) {
        this._nextLevel();
      }
    }
  }

  /**
   * Sets gameplay to the next level (from 3 to 6)
   * Checks if a gameplay completed
   */
  _nextLevel() {
    if (this._level === 6) {
      alert('Win!');
    } else {
      this._level++;
      this._generateTowers();
      this._handItem = 0;
      this._handPosition = 1;
    }
  }

  /**
   * adds move to move counter
   */
  _addMove() {
    this._move++;
  }


 /**
  * Generates new random towers
  */
  _generateTowers() {
    // cleaning towers
    this._towers.forEach(a => a.splice(0));

    // sequentinaly adding new item
    for (let i = this._level; i >= 1; i--) {
      this._towerSetBlock(Math.floor(Math.random() * 3), i);
    }

    // regenrate towers is if randomly made a winning configuration
    if (this._checkTowers())
      this._generateTowers();
  }

  /**
   * Initializes a new gameplay from level 3 to 6
   */
  init() {
    // resets all properties to constructor state
    this._handPosition = 1;
    this._handItem = 0;
    this._level = 3;
    this._move = 0;

    // generates new tower elements
    this._generateTowers();

    // draws debug
    this._dbg();
  }
}
