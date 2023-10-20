"use client";

import { useState, MouseEventHandler } from "react";
import styles from "./addToCart.module.scss";

export default function AddToCart({ productId }: { productId: number }) {
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
    let cartString = localStorage.getItem("cart");
    let cart = JSON.parse(cartString || "[]") as {
      id: number;
      quantity: number;
    }[];

    if (cart.length == 0) {
      localStorage.setItem(
        "cart",
        JSON.stringify([{ id: productId, quantity }])
      );
    } else {
      const found = cart.find(({ id }) => {
        id === productId;
      });

      if (found) {
        cart = cart.map((cartItem) => {
          if (cartItem.id === productId) {
            cartItem.quantity += quantity;
          }
          return cartItem;
        });
      } else {
        cart.push({ id: productId, quantity });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    }

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
