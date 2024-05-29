import Products from "./models/Products.js";
import cart from "./models/cart.js";
import { fetchData } from "./utils/httpsReq.js";

const productsNode = document.getElementById("products");
const cartListNode = document.getElementById("cart-list");
const totalPriceNode = document
  .getElementById("total-price")
  .querySelector("span");

//inja ham bayad async konim chun inja nemidune ke func gerefte shode ham async hast va bayad sabr kone
async function render() {
  const productsData = await fetchData();
  // console.log(productsData);
  const cartInstance = new cart(cartListNode, totalPriceNode); //parent: cartListNode (dar class cart) , totalPriceNode: span dar index
  const productsInstance = new Products(
    productsNode,
    productsData,
    cartInstance
  ); //parent: products (dar class Products) , productsData: fetch api
  // console.log(productsInstance);
  // console.log(cartInstance);

  productsInstance.showProducts(); //in metod ro ejra kon
}

document.addEventListener("DOMContentLoaded", render);
