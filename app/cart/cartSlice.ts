import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import cartService from "./cartService";
import { Item } from "./cartTypes";
import { RootState, AppDispatch } from "@/store";

const cartAdapter = createEntityAdapter<Item>({
  selectId: (item) => item.productId,
});

const initialState = cartAdapter.getInitialState({
  status: "idle",
  error: "",
  grandTotal: 0,
});

export const getCart = createAsyncThunk("cart/getCart", async (_, thunkApi) => {
  try {
    return await cartService.getCart();
  } catch (error) {
    return thunkApi.rejectWithValue("Unable to fetch cart");
  }
});

export const addCartItem = createAsyncThunk<
  {
    item: Item;
    items: Item[];
  },
  Item,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>("cart/addCartItem", async (item: Item, thunkApi) => {
  let toUpdate = false;
  let Same = false;
  const state = thunkApi.getState();
  state.cart.ids.map((id) => {
    if (id === item.productId) {
      if (item.quantity !== state.cart.entities[id]?.quantity) {
        toUpdate = true;
      } else {
        Same = true;
      }
    }
    return id;
  });
  if (toUpdate) {
    thunkApi.dispatch(updateCartItem(item));
    return thunkApi.rejectWithValue("Item updated in the cart!");
  }
  if (Same) {
    return thunkApi.rejectWithValue("Item already present in cart!");
  }
  const items = Object.values(state.cart.entities) as Item[];
  items.push(item);
  return { item, items };
});

export const updateCartItem = createAsyncThunk<
  { item: Item; items: Item[] },
  Item,
  { state: RootState }
>("cart/updateCartItem", async (item: Item, thunkApi) => {
  const state = thunkApi.getState();
  const oldItems = Object.values(state.cart.entities) as Item[];
  const items = oldItems.map((oldItem) => {
    if (oldItem.productId === item.productId) {
      return item;
    } else {
      return oldItem;
    }
  });
  return { item, items };
});

export const removeCartItem = createAsyncThunk<
  { item: Item; items: Item[] },
  Item,
  { state: RootState }
>("cart/removeCartItem", async (item: Item, thunkApi) => {
  const state = thunkApi.getState();
  const oldItems = Object.values(state.cart.entities) as Item[];
  const items = oldItems.filter((oldItem) => {
    return oldItem.productId !== item.productId;
  });
  return { item, items };
});

export const removeAllCartItems = createAsyncThunk(
  "cart/removeAllCartItems",
  async () => {
    return;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = "idle";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.status = "successful";
        cartAdapter.setAll(state, action.payload.items);
        state.grandTotal = action.payload.grandTotal;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(addCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.status = "successful";
        cartAdapter.addOne(state, action.payload.item);
        state.grandTotal = state.grandTotal + action.payload.item.total;
        cartService.setCart({
          items: action.payload.items,
          grandTotal: state.grandTotal,
        });
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.status = "successful";
        const previousTotal =
          state.entities[action.payload.item.productId]?.total;

        if (previousTotal) {
          state.grandTotal =
            state.grandTotal - previousTotal + action.payload.item.total;
        }
        cartAdapter.upsertOne(state, action.payload.item);
        cartService.setCart({
          items: action.payload.items,
          grandTotal: state.grandTotal,
        });
      })
      .addCase(updateCartItem.rejected, (state) => {
        state.status = "failed";
        state.error = "failed to update cart item";
      })
      .addCase(removeCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.status = "successful";
        state.grandTotal = state.grandTotal - action.payload.item.total;
        cartAdapter.removeOne(state, action.payload.item.productId);
        cartService.setCart({
          items: action.payload.items,
          grandTotal: state.grandTotal,
        });
      })
      .addCase(removeCartItem.rejected, (state) => {
        state.status = "failed";
        state.error = "failed to remove item from cart";
      })
      .addCase(removeAllCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeAllCartItems.fulfilled, (state) => {
        state.status = "successful";
        state.grandTotal = 0;
        cartAdapter.removeAll(state);
        cartService.setCart({ items: [], grandTotal: state.grandTotal });
      })
      .addCase(removeAllCartItems.rejected, (state) => {
        state.status = "failed";
        state.error = "failed to remove all cart items";
      });
  },
});

export const { reset: resetCart } = cartSlice.actions;
export const {
  selectAll: selectAllCartItems,
  selectById: selectCartItemById,
  selectIds: selectAllCartItemIds,
} = cartAdapter.getSelectors<RootState>((state) => state.cart);
export default cartSlice.reducer;
