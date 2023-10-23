const getItems = () => {
  const cartString = localStorage.getItem("cart");
  const cart = JSON.parse(cartString || "[]") as {
    id: number;
    quantity: number;
    total: number;
  }[];
  return cart;
};

const addItem = (id: number, quantity: number, total: number) => {
  let items = getItems();

  if (items.length === 0) {
    localStorage.setItem("cart", JSON.stringify([{ id, quantity, total }]));
  } else {
    const found = items.find((item) => {
      return item.id === id;
    });

    if (found) {
      items = items.map((cartItem) => {
        if (cartItem.id === id) {
          cartItem.quantity += quantity;
          cartItem.total += total;
        }
        return cartItem;
      });
    } else {
      items.push({ id, quantity, total });
    }
    localStorage.setItem("cart", JSON.stringify(items));
  }
};

const updateItem = (id: number, quantity: number, total: number) => {
  let items = getItems();

  items = items.map((item) => {
    if (item.id === id) {
      item.quantity = quantity;
      item.total = total;
    }
    return item;
  });

  localStorage.setItem("cart", JSON.stringify(items));
};

const removeItems = () => {
  localStorage.removeItem("cart");
};

const cartService = { getItems, addItem, updateItem, removeItems };

export default cartService;
