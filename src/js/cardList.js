class CardList {
  constructor(container, func){
    this.container = container;
    this.func = func;
  }

  addCard(name, link, idUser, idCard) {
    this.container.appendChild(this.func({name, link}, idUser, idCard));
  }

  render(array) {
    for (const elem of array) {
      this.addCard(elem.name, elem.link, elem.owner._id, elem._id);
    }
  }
}