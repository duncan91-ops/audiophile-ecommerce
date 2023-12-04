import Image from "next/image";
import styles from "./cartItem.module.scss";
import { getProducts } from "@/utils/getProducts";
import { EntityId } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import {
  selectCartItemById,
  updateCartItem,
  removeCartItem,
} from "../../cartSlice";
import { RootState, useAppDispatch } from "@/store";

export default function CartItem({ id }: { id: EntityId }) {
  const dispatch = useAppDispatch();
  const products = getProducts();
  const product = products.find((product) => product.id === id)!;
  const item = useSelector((state: RootState) =>
    selectCartItemById(state, id)
  )!;

  const increaseProductQuantity = () => {
    dispatch(
      updateCartItem({
        productId: item.productId,
        quantity: item.quantity + 1,
        total: product.price * (item.quantity + 1),
      })
    );
  };

  const reduceProductQuantity = () => {
    if (item.quantity === 1) {
      dispatch(removeCartItem(item));
    } else {
      dispatch(
        updateCartItem({
          productId: item.productId,
          quantity: item.quantity - 1,
          total: product.price * (item.quantity - 1),
        })
      );
    }
  };

  return (
    <li className={styles.item}>
      <div className={styles.item__img}>
        <Image
          src={product.cartImage}
          alt="product cart image"
          className={styles.img}
          fill
          object-fit="contain"
        />
      </div>
      <div className={styles.details}>
        <p className={styles.name}>{product.shortName}</p>
        <p className={styles.price}>$ {product.price.toLocaleString()}</p>
      </div>
      <div className={styles.quantity}>
        <button
          type="button"
          className={styles.btn__subtract}
          onClick={reduceProductQuantity}
        >
          -
        </button>
        <span className={styles.quantity__value}>x{item.quantity}</span>
        <button
          type="button"
          className={styles.btn__add}
          onClick={increaseProductQuantity}
        >
          +
        </button>
      </div>
    </li>
  );
}
