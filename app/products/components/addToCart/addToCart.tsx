"use client";

import { useState, MouseEventHandler, useEffect, useRef } from "react";
import styles from "./addToCart.module.scss";
import { useAppDispatch } from "@/store";
import { addCartItem } from "@/cart";

export default function AddToCart({
  productId,
  productPrice,
  productName,
}: {
  productId: number;
  productPrice: number;
  productName: string;
}) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState<number>(1);
  const [message, setMessage] = useState<string>("");
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
    dispatch(
      addCartItem({
        productId,
        quantity,
        total: productPrice * quantity,
      })
    );

    setQuantity(1);
    setMessage(`${productName} added to cart!`);
    setShowMessage(true);
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
        }}
      >
        add to cart
      </button>
      {showMessage && <p className={styles.msg}>{message}</p>}
    </div>
  );
}
