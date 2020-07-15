export class FormValidator {
  constructor(form){
    this.form = form;
    this.setEventListeners();
  }

  checkInputValidity(input, error){
    let isInputValid = true;
    const validationMessages = {
    noContent: 'Это обязательное поле',
    wrongInput: 'Должно быть от 2 до 30 символов',
    linkContent: 'Здесь должна быть ссылка'
  }
  
  if (input.validity.valueMissing){
    error.textContent = validationMessages.noContent;
    error.classList.add('error-message_invalid-input');
    error.classList.remove('error-message_valid-input'); 
    input.classList.add('popup__input_invalid');
    input.classList.remove('popup__input_valid');

    isInputValid = false;
  }

  else if (input.validity.tooLong || input.validity.tooShort){
    error.textContent = validationMessages.wrongInput;
    error.classList.add('error-message_invalid-input');
    error.classList.remove('error-message_valid-input'); 
    input.classList.add('popup__input_invalid');
    input.classList.remove('popup__input_valid');

    isInputValid = false;
  }

  else if (input.validity.typeMismatch){
    error.textContent = validationMessages.linkContent;
    error.classList.add('error-message_invalid-input');
    error.classList.remove('error-message_valid-input');
    input.classList.add('popup__input_invalid'); 
    input.classList.remove('popup__input_valid'); 

    isInputValid = false;
  }

  else {
    error.classList.remove('error-message_invalid-input');
    error.classList.add('error-message_valid-input');
    input.classList.remove('popup__input_invalid');
    input.classList.add('popup__input_valid');
  }
  return isInputValid;
  }

  setSubmitButtonState(button, status){
    if (status) {  
      button.classList.add('popup__button_valid');
      button.classList.remove('popup__button_invalid');
      button.disabled = false;
    } else {
      button.classList.remove('popup__button_valid');
      button.classList.add('popup__button_invalid');
      button.disabled = true; 
    }
  }

  setEventListeners(){
    this.form.addEventListener('input', () => {
      let isFormValid = true;
      let elements = Array.from(this.form.elements);
  
      elements.forEach(elem => {
        if (elem.type !== 'submit'){
          let errors = elem.nextElementSibling;

          const isValidInput = this.checkInputValidity(elem, errors);
          if (!isValidInput) {
            isFormValid = false;
          }
        }
        const button = this.form.querySelector('.button');
        this.setSubmitButtonState(button, isFormValid);
      });
    });
  }

 clear() {
    this.formError = Array.from(this.form.querySelectorAll('.error-message_invalid-input'));

    this.formError.forEach(elem => {
      return elem.textContent = '';
    });
  }



}