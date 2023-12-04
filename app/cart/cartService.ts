import { Item } from "./cartTypes";

const getCart = async () => {
  const cartString = window.localStorage.getItem("cart");
  const cart = JSON.parse(cartString || '{ "items": [], "grandTotal": 0 }') as {
    items: Item[];
    grandTotal: number;
  };
  return cart;
};

const setCart = (cart: { items: Item[]; grandTotal: number }) => {
  const cartString = JSON.stringify(cart);
  localStorage.setItem("cart", cartString);
};

const cartService = { getCart, setCart };

export default cartService;
