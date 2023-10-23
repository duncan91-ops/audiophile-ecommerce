"use client";

import { useState, MouseEventHandler } from "react";
import styles from "./addToCart.module.scss";
import cartService from "@/services/cartService";

export default function AddToCart({
  productId,
  productPrice,
}: {
  productId: number;
  productPrice: number;
}) {
  const [quantity, setQuantity] = useState<number>(1);

  const subtract: MouseEventHandler<HTMLButtonElement> = () => {
    if (quantity == 1) {
      return;
    }

    setQuantity((value) => {
      return value - 1;
    });
  };

  const add: MouseEventHandler<HTMLButtonElement> = () => {
    setQuantity((value) => {
      return value + 1;
    });
  };

  const addToCart = () => {
    cartService.addItem(productId, quantity, productPrice * quantity);

    setQuantity(1);
  };

  return (
    <div className={styles.cta}>
      <div className={styles.quantity}>
        <button className={styles.btn__subtract} onClick={subtract}>
          -
        </button>
        <span className={styles.quantity__value}>{quantity}</span>
        <button className={styles.btn__add} onClick={add}>
          +
        </button>
      </div>
      <button type="button" className="btn btn__primary" onClick={addToCart}>
        add to cart
      </button>
    </div>
  );
}
