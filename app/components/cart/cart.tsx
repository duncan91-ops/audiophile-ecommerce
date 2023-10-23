import { useState } from "react";
import CartItem from "../cartItem/cartItem";
import styles from "./cart.module.scss";
import cartService from "@/services/cartService";

export default function Cart() {
  const cartItems = cartService.getItems();
  const [reRender, setReRender] = useState<boolean>(false);

  const handleReRender = () => {
    setReRender(!reRender);
  };

  const calculateTotal = () => {
    let grandTotal = 0;
    cartItems.map((cartItem) => {
      grandTotal += cartItem.total;
    });
    return grandTotal;
  };

  return (
    <article
      className={styles.cart}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={styles.details}>
        <header className={styles.header}>
          <h3 className={styles.title}>cart ({cartItems.length})</h3>
          <button
            className={styles.btn__remove}
            type="button"
            onClick={() => {
              cartService.removeItems();
              handleReRender();
            }}
          >
            Remove all
          </button>
        </header>
        <ul className={styles.items}>
          {cartItems.map(({ id, quantity }) => {
            return (
              <CartItem
                key={id}
                id={id}
                orderQuantity={quantity}
                handler={handleReRender}
              />
            );
          })}
        </ul>
        <div className={styles.total}>
          <p className={styles.total__label}>total</p>
          <p className={styles.total__value}>
            $ {calculateTotal().toLocaleString()}
          </p>
        </div>
      </div>
      <button
        type="button"
        className={`${styles.btn__checkout} btn btn__primary`}
      >
        checkout
      </button>
    </article>
  );
}
