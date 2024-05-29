class Cart {
  constructor(parent, price) {
    //parent: cartList ast ke products tush hastan
    this.parent = parent;
    this.price = price;
    this.products = []; //product[] baraye sabade kharid dar cart.js
    this.toShow = [];
    this.parent.addEventListener("click", this);
  }

  showProducts() {
    this.toShow = [...new Set(this.products)]; //ke az tekrare product jelogiiri beshe
    this.parent.innerHTML = ""; //ke reshte Empty nabashe
    this.toShow.forEach((product) => {
      const qty = this.products.filter((p) => p.id === product.id).length; //length ke tedad ro bede, va yek array bema mide
      this.createCard(product, qty);

      this.calculateTotalPrice();
    });
  }
  createCard(data, qty) {
    // console.log(data); //badesh bayad (this.cart.showProducts();) toye (addToCard(id)) products benevisim
    const cardEle = document.createElement("div");

    const imgEle = this.productImg(data);
    const infoEle = this.productInfo(data);
    const controlEle = this.productControl(data, qty);

    cardEle.innerHTML = imgEle;
    cardEle.innerHTML += infoEle;
    cardEle.innerHTML += controlEle;

    this.parent.appendChild(cardEle);
  }

  productImg(data) {
    const { image, alt } = data;

    const imgJSX = `<img src=${image} alt=${alt} />`;

    return imgJSX;
  }

  productInfo(data) {
    const { name, price } = data;

    const infoJSX = `
      <div id="cart-info"> 
        <h4> ${name} </h4>
        <p> $ ${price} </p>
      </div>
      `;

    return infoJSX;
  }

  productControl(data, qty) {
    const { id } = data;

    const controlJSX = `
      <div id="cart-control">
        <div>
          <button data-id=${id}> - </button>
          <span> ${qty} </span>
          <button data-id=${id}> + </button>
        </div>
        <button data-id=${id}> Remove </button>
      </div>
    `;

    return controlJSX;
  }

  handleEvent(event) {
    console.log("click"); //harja click konim ejra mishe
    const tagName = event.target.tagName;
    const id = event.target.dataset.id;
    const type = event.target.innerText;

    if (tagName !== "BUTTON") return; //shart baraye click ruye BUTTON
    // console.log("click BUTTON"); //ba click ruye BUTTON ejra mishe

    switch (type) {
      case "+":
        this.increase(id);
        break;
      case "-":
        this.decrease(id);
        break;
      case "Remove":
        this.remove(id);
        break;
    }
  }

  increase(id) {
    const product = this.products.find((p) => p.id === +id);
    this.products.push(product); //yeki ezafe behse
    this.showProducts(); //product ro neshun bede ba qty jadid
  }
  decrease(id) {
    const index = this.products.findIndex((p) => p.id === +id);
    this.products.splice(index, 1); //az index peyda shode yeki hazf kon: avalin product ro peyda mikone va hazf mikone
    this.showProducts();
  }
  remove(id) {
    const newProducts = this.products.filter((p) => p.id !== +id);
    this.products = newProducts;
    this.showProducts();
  }

  calculateTotalPrice() {
    const total = this.products.reduce((acc, cur) => (acc += cur.price), 0); //meghdare aval 0 hast | accumulator,current
    this.price.innerText = `$ ${total}`;
  }
}

export default Cart;
