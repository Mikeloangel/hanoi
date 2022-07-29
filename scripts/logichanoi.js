export class LogicHanoi{
  constructor(data){
      // structure
      // three towers represented as an array of stacks (arrays)
      this._towers = [ [],[],[] ]
      // what position 0,1 or 2
      this._handPosition = 1;
      // what block in hand
      this._handItem = 0;
      this._level = 6;
      //move counter
      this._move = 0;

      /**
         * DEBUG AREA
         */
       this._isDebug = data.debug;
       this._debugArea = document.querySelector(data.debudSelector);
  }

  _dbg(){
    if(!this._isDebug){
      this._debugArea.innerHTML = ''
      return;
    }
      var res = `<p>DEBUG AREA:</p>
      <table style="border:1px solid black;width:100%;">`

      res += `<tr>
      <td>*</td>
      <td>${ this._handPosition === 0 ? this._handItem : ' ' }</td>
      <td>${ this._handPosition === 1 ? this._handItem : ' ' }</td>
      <td>${ this._handPosition === 2 ? this._handItem : ' ' }</td>
      </tr>`;

      for(let i=5;i>=0;i--)
      res += `<tr style="border:1px solid black;">
          <td>${i}</td>
          <td>${this._towers[0][i] === undefined ? '.' : this._towers[0][i] }</td>
          <td>${this._towers[1][i] === undefined ? '.' : this._towers[1][i] }</td>
          <td>${this._towers[2][i] === undefined ? '.' : this._towers[2][i] }</td>
      </tr>`

      res += `</table>
      <p>Level: ${this._level} <br>Moves: ${this._move}</p>
      `;

      this._debugArea.innerHTML = res;
  }

  // returns false if blockSize cant fit
  // returns true if we succesfully insert block
  _towerSetBlock(towerN,blockSize){
      if(this._towers[towerN].at(-1) < blockSize) return false;
      this._towers[towerN].push(blockSize);
      return true;
  }

  // checks if towers in a winnig position
  // let i corresponds with amount of empty rods
  _checkTowers(){
      let i = 0;
      this._towers.forEach(e =>{
          if (e.some( el => el>0) || e.length!=0) i++;
      });

      if(i===1) return true;
      return false;
  }
  //posistive direction is to the right
  //negative direction to the left
  _moveHand(direction){
      this._handPosition += direction;
      if(this._handPosition>2) this._handPosition = 0;
      if(this._handPosition<0) this._handPosition = 2;
      this._addMove();
  }

  _pickupItem(){
      // уже что то поднято значит не берем ничего
      if(this._handItem!=0) return false;
      this._handItem = this._towers[this._handPosition].pop();
      if(this._handItem === undefined) this._handItem = 0;
      return true;
  }

  _dropItem(){
      if (this._handItem === 0) return;

      if(this._towerSetBlock(this._handPosition,this._handItem)){
          this._handItem = 0;

          if(this._checkTowers()){
              console.log('WIN WIN WIN');
              this.init(4);
          }
      }
  }

  _addMove(){
      this._move++;
  }

  init(level = 6){
      if(level>6 || level<3){
          console.error('Level must be between 3 and 6')
          return false;
      }

      this._handPosition = 1;
      this._handItem = 0;
      this._towers.forEach( a => a.splice(0));
      this._level = level;
      this._move = 0;

      for(let i=this._level; i>= 1; i--){
          this._towerSetBlock(Math.floor(Math.random()*3),i)
      }

      // если сгенерировали башню которая может считаться выйгрышной,
      // то попробуем сгенерировать еще раз
      if(this._checkTowers()) this.init(level);

      this._dbg();
      return true;
  }


}
