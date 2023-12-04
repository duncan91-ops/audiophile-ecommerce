import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./summary.module.scss";
import { selectAllCartItemIds } from "@/cart";
import { RootState } from "@/store";
import SummaryItem from "../summaryItem/summaryItem";

export default function Summary() {
  const cartItemIds = useSelector(selectAllCartItemIds);
  const total = useSelector((state: RootState) => state.cart.grandTotal);
  const [vat, setVat] = useState<number>(0);
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const shipping = cartItemIds.length > 0 ? 50 : 0;

  useEffect(() => {
    const value = Math.trunc(0.2 * total);
    setVat(value);
  }, [total]);

  useEffect(() => {
    setGrandTotal(total + vat + shipping);
  }, [total, vat, shipping]);

  return (
    <div className={styles.summary}>
      <h2 className={styles.summary__title}>summary</h2>
      {cartItemIds.length > 0 && (
        <ul className={styles.summary__items}>
          {cartItemIds.map((id) => {
            return <SummaryItem key={id} id={id} />;
          })}
        </ul>
      )}
      <article className={styles.summary__details}>
        <div className={styles.summary__total}>
          <span className={styles.summary__label}>total</span>
          <span className={styles.summary__value}>
            $ {total.toLocaleString()}
          </span>
        </div>
        <div className={styles.summary__shipping}>
          <span className={styles.summary__label}>shipping</span>
          <span className={styles.summary__value}>
            $ {shipping.toLocaleString()}
          </span>
        </div>
        <div className={styles.summary__vat}>
          <span className={styles.summary__label}>vat(included)</span>
          <span className={styles.summary__value}>
            $ {vat.toLocaleString()}
          </span>
        </div>
        <div className={styles.summary__grand_total}>
          <span className={styles.summary__label}>grand total</span>
          <span className={styles.summary__value}>
            $ {grandTotal.toLocaleString()}
          </span>
        </div>
      </article>
    </div>
  );
}
