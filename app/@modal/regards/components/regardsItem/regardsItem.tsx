import Image from "next/image";
import styles from "./regardsItem.module.scss";
import { getProducts } from "@/utils/getProducts";
import { EntityId } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { selectCartItemById } from "@/cart";
import { RootState } from "@/store";

export default function RegardsItem({ id }: { id: EntityId }) {
  const products = getProducts();
  const product = products.find((product) => product.id === id)!;
  const item = useSelector((state: RootState) =>
    selectCartItemById(state, id)
  )!;

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
        <span className={styles.quantity__value}>x{item.quantity}</span>
      </div>
    </li>
  );
}
