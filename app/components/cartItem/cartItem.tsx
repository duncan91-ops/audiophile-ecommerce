import { useState, useEffect, MouseEventHandler } from "react";
import Image from "next/image";
import styles from "./cartItem.module.scss";
import { getProducts } from "@/utils/getProducts";
import cartService from "@/services/cartService";

export default function CartItem({
  id,
  orderQuantity,
  handler,
}: {
  id: number;
  orderQuantity: number;
  handler: () => void;
}) {
  const [quantity, setQuantity] = useState<number>(orderQuantity);
  const products = getProducts();
  const product = products.find((product) => product.id === id)!;

  useEffect(() => {
    cartService.updateItem(id, quantity, product.price * quantity);
    handler();
  }, [quantity, id, product, handler]);

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
        <button className={styles.btn__subtract} onClick={subtract}>
          -
        </button>
        <span className={styles.quantity__value}>{quantity}</span>
        <button className={styles.btn__add} onClick={add}>
          +
        </button>
      </div>
    </li>
  );
}
