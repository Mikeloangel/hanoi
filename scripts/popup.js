export class Popup{
  /**
   * data.popupSelector
   * data.popupOpenClass
   */
  constructor(data){
      this._popupSelector = data.popupSelector;
      this._popupOpenClass = data.popupOpenClass;

      this._popup = document.querySelector(this._popupSelector);

      console.log(this._popupOpenClass);
  }

  openPopup(){
    this._popup.classList.add(this._popupOpenClass);
    console.log('Popup opened')
  }

  closePopup(){
    this._popup.classList.remove(this._popupOpenClass);
  }
}
