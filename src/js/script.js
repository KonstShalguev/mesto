import {Api} from './api.js';
import {Card} from './card.js';
import {CardList} from './cardList.js';
import {FormValidator} from './formValidator.js';
import {Popup} from './popup.js';
import {UserInfo} from './userInfo.js';

import "../pages/index.css";


//(function () {
/* Объявления классов */
const popupAdd = new Popup(document.querySelector('#popup-add'), 'popup_is-opened');
const popupEdit = new Popup(document.querySelector('#popup-edit'), 'popup_is-opened');
const poupImg = new Popup(document.querySelector('#popupImg'), 'popup_is-opened');

const imgPopup = document.querySelector('.popup__image');
const newCard = (obj, idUser, idCard) => {
  const card = new Card(poupImg, obj, api, idUser, idCard, imgPopup);
  return card.create();
}
const cardList = new CardList(document.querySelector('.places-list'), newCard);

const api = new Api('https://praktikum.tk/cohort11', '00df0ea2-820a-43f7-978c-ba3837ea27da');
api.getInitialCards()
  .then(res => {
    cardList.render(res);
  })
  .catch(err => console.log(err));

const userData = new UserInfo(document.querySelector('.user-info__name'),
                              document.querySelector('.user-info__job'),
                              document.querySelector('.popup__input_type_name'),
                              document.querySelector('.popup__input_type_info'), api
);
userData.updateUserInfo();

const formEditValidator = new FormValidator(document.querySelector('.popup__form-card'));
const formAddValidator = new FormValidator(document.querySelector('.popup__form-profile'));

/* Переменные */
const places = document.querySelector('.places-list');
const form = document.querySelector('.popup__form-card');

const profileForm = document.querySelector('.popup__form-profile');

const buttonSaveCard = document.querySelector('#buttonAdd');
const buttonSaveProfile = document.querySelector('#buttonSave');

const buttonAdd = document.querySelector('.user-info__button');
const buttonEdit = document.querySelector('.user-info__button-edit');

const popupCloseIcon = document.querySelectorAll('.popup__close');
const userId = '2db8f103c53b552e2b100af0';

/* Слушатели событий */
popupCloseIcon.forEach(function(element){
  element.addEventListener('click', function(){
    const popup = event.target.closest('.popup');

    if (popup.id === 'popup-add') {
      popupAdd.close();
    }

    if (popup.id === 'popup-edit') {
      popupEdit.close();
    }

    if (popup.id === 'popupImg') {
      poupImg.close();
    }
  });
});

buttonAdd.addEventListener('click', function(){
  form.reset();
  formEditValidator.clear();
  formAddValidator.setSubmitButtonState(buttonSaveCard, false);
  popupAdd.open(document.querySelector('#popup-add'));
});

buttonEdit.addEventListener('click', function(){
  formEditValidator.setSubmitButtonState(buttonSaveProfile, true);
  popupEdit.open(document.querySelector('#popup-edit'));
  userData.updateUserInfo();
  formAddValidator.clear();
});

profileForm.addEventListener('submit', function(event){
  event.preventDefault();

  buttonSaveProfile.textContent = 'Загрузка...';
  
  userData.setUserInfo()
    .then(() => {
        userData.updateUserInfo();
        popupEdit.close();
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() =>{
      buttonSaveProfile.textContent = 'Сохранить';
    })
  
});

form.addEventListener('submit', function(event){
  event.preventDefault();
  buttonSaveCard.textContent = 'Загрузка...';
  const descr = form.elements.name;
  const links = form.elements.link;

  const obj = {
    name: descr.value,
    link: links.value
  }

  api.addNewCard(descr.value, links.value)
    .then(res => {
      return res._id;
    })

    .then(res => {
        const newCard = new Card(poupImg, obj, api, userId, res, imgPopup);
        places.appendChild(newCard.create());
        newCard.setEventListeners();
        form.reset();
        popupAdd.close();
    })

    .catch(err => { 
      console.log(err)
    })

    .finally(() =>{
      buttonSaveCard.textContent = '+';
    })
});
//})();
