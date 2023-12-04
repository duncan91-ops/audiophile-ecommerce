import { Item } from "@/types/item";

const addItem: (item: Item) => { type: "ADD_ITEM"; payload: Item } = (
  item: Item
) => {
  return {
    type: "ADD_ITEM",
    payload: item,
  };
};

const cartActions = { addItem };

export default cartActions;
