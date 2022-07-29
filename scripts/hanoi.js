import { LogicHanoi } from "./logichanoi.js";

export class Hanoi extends LogicHanoi{
    constructor(selectors){
        super(selectors.debug);
        // this._containerSelector = selectors.containerSelector;
        this._towerTemplateSelector = selectors.towerTemplateSelector;

        // this._hanoiContainer = document.querySelector(this._containerSelector);
        // this._towerSelector = document.querySelector(this._towerTemplateSelector);
        this._hanoiContainer = document.querySelector(selectors.containerSelector);
        this._towerTemplateElement = document.querySelector(selectors.towerTemplateSelector);

        this._setEventListeners();

        this._initGraphic();
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
            handBlock.classList.remove('tower__block');
            // handBlock.classList.remove('tower__block_active');


          }else{
            handBlock.classList.add('tower__block');
            // handBlock.classList.add('tower__block_active');
          }

          const blocks = tower.querySelectorAll('.tower__block');
          blocks.forEach( (block,bindex) => {
                // block.classList.add(`tower__block_${this._towers[index][bindex]}`);
                if(this._towers[index][this._level - bindex -1]>0)
                // if(this._towers[index].at(-bindex)>0)
                  block.classList.add(`tower__block_active`);
                else
                  block.classList.remove(`tower__block_active`);

                // console.log(`index ${index}, bindex ${bindex}, ixb ${this._towers[index][bindex]}`)

          })
        })
    }

    init(level = 6){
        super.init(level)

        this._revalidateGraphic();

        this._dbg();
    }


}
