class Products {
  //productsNode, productsDatad (dar app.js)
  constructor(parent, products, cart) {
    this.parent = parent;
    this.products = products; //product ke az api gereftim
    this.cart = cart; //cart dar cart.js
    this.parent.addEventListener("click", this);
  }

  showProducts() {
    this.products.forEach((product) => this.createCard(product));
  }

  createCard(data) {
    const cardEle = document.createElement("div");

    const imgEle = this.productImg(data);
    const infoEle = this.productInfo(data);

    cardEle.innerHTML = imgEle;
    cardEle.innerHTML += infoEle; // + ke maghadir ghabli delete nashan
    // cardEle.appendChild(imgEle);

    this.parent.appendChild(cardEle);
  }

  productImg(data) {
    const { image, alt } = data;
    const imgJSX = `<img src=${image} alt=${alt} />`;
    // const img = document.createElement("img");
    // img.src = image;
    // img.alt = alt;

    return imgJSX;
  }

  productInfo(data) {
    const { id, name, price } = data;
    const infoJSX = `
    <div id="product-info">
      <h3> ${name} </h3>
      <div>
        <span> $ ${price} </span>
        <button data-id=${id}> + </button>  <!-- data-set=${id} -->
      </div>
    </div>
    `;

    return infoJSX;

    // const info = document.createElement("div");
    // const productName = document.createElement("h3");
    // const control = document.createElement("div");
    // const price = document.createElement("span");
    // const button = document.createElement("button");

    // productName.innerText = data.name;
    // price.innerText = data.price;
    // button.innerText = "+";

    // control.append(price, button);
    // info.append(productName, control);

    // cardEle.appendChild(info);
  }

  //func shenakhte shode dar JS baraye: this.parent.addEventListener("click", this);
  handleEvent(event) {
    // console.log("click")
    // console.log("element.tagName"); //H3 BUTTON IMG, ba horufe bozorg neshun mide
    const element = event.target;
    //pas inja ham ba horufe bozorg minevisim
    if (element.tagName === "BUTTON") {
      this.addToCard(element.dataset.id); //dataset dade shode dar index
    }
  }

  addToCard(id) {
    // console.log(id);
    const product = this.products.find((item) => item.id === +id);
    console.log(product);
    this.cart.products.push(product); //products az Products.js
    console.log(this.cart);
    this.cart.showProducts();
  }
}

export default Products;
