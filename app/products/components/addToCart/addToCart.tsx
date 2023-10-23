"use client";

import { useState, MouseEventHandler, useEffect, useRef } from "react";
import styles from "./addToCart.module.scss";
import cartService from "@/services/cartService";

export default function AddToCart({
  productId,
  productPrice,
  productName,
}: {
  productId: number;
  productPrice: number;
  productName: string;
}) {
  const [quantity, setQuantity] = useState<number>(1);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const timerId = useRef<number>();

  useEffect(() => {
    if (showMessage) {
      timerId.current = window.setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timerId.current);
    };
  }, [showMessage]);

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
      <button
        type="button"
        className="btn btn__primary"
        onClick={() => {
          addToCart();
          setShowMessage(true);
        }}
      >
        add to cart
      </button>
      {showMessage && (
        <p className={styles.msg}>{productName} added to cart!</p>
      )}
    </div>
  );
}
