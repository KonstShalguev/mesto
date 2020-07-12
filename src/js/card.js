class Card {
  constructor(poupImg, obj, api, idUser, idCard, imgPopup){
    this.poupImg = poupImg;
    this.link = obj.link;
    this.name = obj.name;
    this.imgPopup = imgPopup;

    this.openImage = this.openImage.bind(this);
    this.remove = this.remove.bind(this)
    this.like = this.like.bind(this);

    this.api = api;
    this.idUser = idUser;
    this.idCard = idCard;
  }

  create() {
    const card = document.createElement('div');
    card.classList.add('place-card');

    card.insertAdjacentHTML('afterbegin',
      `<div class="place-card__image">
        <button class="place-card__delete-icon"></button>
      </div>
      
      <div class="place-card__description">
        <h3 class="place-card__name"></h3>
        <button class="place-card__like-icon"></button>
      </div>`);

    if (this.idUser !== '2db8f103c53b552e2b100af0'){
      card.querySelector('.place-card__delete-icon').style.display = 'none';
    }

    const bgImg = card.querySelector('.place-card__image');
    bgImg.setAttribute('style', `background-image: url(${this.link})`);
    const cardName = card.querySelector('.place-card__name');
    cardName.textContent = this.name;

    this.cardName = card;
    this.setEventListeners();

    return card;
  }

  setEventListeners() {
    this.cardName.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
    this.cardName.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    this.cardName.querySelector('.place-card__image').addEventListener('click', this.openImage);
  }

  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }

  openImage() {
    this.imgPopup.src = this.link;
    this.poupImg.open();
  }

  remove(event) {
    if (window.confirm("Вы действительно хотите удалить эту карточку?")) { 
        
        this.api.deleteCard(this.idCard)
        .then(() =>{
            this.cardName.querySelector('.place-card__delete-icon').removeEventListener('click', this.remove);
            this.cardName.querySelector('.place-card__image').removeEventListener('click', this.openImage);
            this.cardName.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
            this.cardName.remove();
            event.stopPropagation();
        })
        .catch(err => console.log(err))
    }
    event.stopPropagation();
  }

}