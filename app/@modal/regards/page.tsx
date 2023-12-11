"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import styles from "./page.module.scss";
import { Modal } from "@/components";
import { selectAllCartItemIds, removeAllCartItems } from "@/cart";
import { RootState, useAppDispatch } from "@/store";
import { RegardsItem } from "./components";

export default function Regards() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartItemIds = useSelector(selectAllCartItemIds);
  const cartItemId = cartItemIds[0];
  const remainingItemsNumber = cartItemIds.length - 1;
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

  if (!pathname.includes("regards")) {
    return null;
  }

  const complete = () => {
    dispatch(removeAllCartItems());
    router.push("/");
  };

  return (
    <Modal>
      <section className={styles.regards}>
        <div className={styles.regards__content}>
          <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <circle fill="#D87D4A" cx="32" cy="32" r="32" />
              <path
                stroke="#FFF"
                strokeWidth="4"
                d="m20.754 33.333 6.751 6.751 15.804-15.803"
              />
            </g>
          </svg>
          <div className={styles.message}>
            <h1 className={styles.message__title}>thank you for your order</h1>
            <p className={styles.message__content}>
              You will receive an email confirmation shortly.
            </p>
          </div>
          <div className={styles.details}>
            <div className={styles.details__main}>
              {cartItemId && <RegardsItem id={cartItemId} />}
              {remainingItemsNumber ? (
                <>
                  <div className={styles.divider}></div>
                  <p className={styles.remaining}>
                    and {remainingItemsNumber} other item(s)
                  </p>
                </>
              ) : null}
            </div>
            <div className={styles.details__sub}>
              <span className={styles.label}>grand total</span>
              <span className={styles.value}>
                $ {grandTotal.toLocaleString()}
              </span>
            </div>
          </div>
          <button
            type="button"
            className={`${styles.btn__home} btn btn__primary`}
            onClick={complete}
          >
            back to home
          </button>
        </div>
      </section>
    </Modal>
  );
}
