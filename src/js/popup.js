class Popup {
  constructor (popup, classOpen){
    this.popup = popup;
    this.classOpen = classOpen;
  }

  open(){
    this.popup.classList.add(this.classOpen);
  }

  close(){ 
    this.popup.classList.remove(this.classOpen);
  }
}