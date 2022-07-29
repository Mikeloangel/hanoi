export class Hanoi{
    constructor(selectors){
        // this._containerSelector = selectors.containerSelector;
        this._towerTemplateSelector = selectors.towerTemplateSelector;

        // this._hanoiContainer = document.querySelector(this._containerSelector);
        // this._towerSelector = document.querySelector(this._towerTemplateSelector);
        this._hanoiContainer = document.querySelector(selectors.containerSelector);
        this._towerTemplateElement = document.querySelector(selectors.towerTemplateSelector);

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

        this._setEventListeners();

        this._grTowers = [];

        this._initGraphic();

        /**
         * DEBUG AREA
         */
        this._isDebug = true;
        this._debugArea = document.querySelector('.debugarea');
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

    _setEventListeners(){
        document.addEventListener('keydown',e => this._handleKeyPress(e));
    }

    _handleKeyPress(e){
        switch(e.key){
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
        this._revalidateGraphic();
    }

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

    _dbg(){
      if(!this._isDebug){
        this._debugArea.innerHTML = ''
        return;
      }
        var res = `<table style="border:1px solid black;width:100%;">`

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

    _initGraphic(){
        for(let i = 0;i<3;i++){
          let element = document.querySelector(this._towerTemplateSelector).content.cloneNode(true);
          this._hanoiContainer.append(element);
        }

        this._grTowers = Array.from(document.querySelectorAll('.tower'));
    }

    _revalidateGraphic(){
        this._grTowers.forEach( (tower,index) =>{
          const hand = tower.querySelector('.tower__hand');
          if(this._handPosition===index){
            hand.classList.add('tower__hand-active');
          }else{
            hand.classList.remove('tower__hand-active');
          }

          const handBlock = tower.querySelector('.hand__block');
          if(this._handItem===0 || (this._handItem!=0 && index!=this._handPosition)){
            handBlock.classList.remove('tower__block_active');

          }else{
            handBlock.classList.add('tower__block_active');
          }

          const blocks = tower.querySelectorAll('.tower__block');
          blocks.forEach( (block,bindex) => {
                // block.classList.add(`tower__block_${this._towers[index][bindex]}`);
                if(this._towers[index][bindex]>0)
                // if(this._towers[index].at(-bindex)>0)
                  block.classList.add(`tower__block_active`);
                else
                  block.classList.remove(`tower__block_active`);

                console.log(`index ${index}, bindex ${bindex}, ixb ${this._towers[index][bindex]}`)

          })
        })
    }

    init(level = 6){
        if(level>6 || level<3){
            console.error('Level must be between 3 and 6')
            return;
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


        this._revalidateGraphic();

        this._dbg();
    }


}
