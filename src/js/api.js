class Api {
  constructor(baseUrl, token) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  getUserInformation(){ 
    
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
      authorization: this.token
      }
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  profileEditing(name, about) {

    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  getInitialCards() {

    return fetch(`${this.baseUrl}/cards`, {
      headers: {
      authorization: this.token
      }
    })
    .then(res => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  addNewCard(name, link){
    
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link
      }),
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
      .then(res => {
        if(res.ok){
            return res.json()
          }
        return Promise.reject(`Ошибка: ${res.status}`);
      }) 
  }

  deleteCard(idCard){

    return fetch(`https://praktikum.tk/cohort11/cards/${idCard}`, {
    method: 'DELETE',
    headers: {
      authorization: this.token
    }
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
}