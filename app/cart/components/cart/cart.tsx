import Link from "next/link";
import { useSelector } from "react-redux";
import styles from "./cart.module.scss";
import { RootState, useAppDispatch } from "@/store";
import { selectAllCartItemIds, removeAllCartItems } from "../../cartSlice";
import CartItem from "../cartItem/cartItem";

export default function Cart({ close }: { close: () => void }) {
  const dispatch = useAppDispatch();
  const cartItemIds = useSelector(selectAllCartItemIds);
  const grandTotal = useSelector((state: RootState) => state.cart.grandTotal);

  return (
    <article
      className={styles.cart}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={styles.details}>
        <header className={styles.header}>
          <h3 className={styles.title}>cart ({cartItemIds.length})</h3>
          <button
            className={styles.btn__remove}
            type="button"
            onClick={() => {
              dispatch(removeAllCartItems());
            }}
          >
            Remove all
          </button>
        </header>
        {cartItemIds.length > 0 && (
          <ul className={styles.items}>
            {cartItemIds.map((id) => {
              return <CartItem key={id} id={id} />;
            })}
          </ul>
        )}
        <div className={styles.total}>
          <p className={styles.total__label}>total</p>
          <p className={styles.total__value}>$ {grandTotal.toLocaleString()}</p>
        </div>
      </div>
      {cartItemIds.length > 0 && (
        <Link
          href="/checkout"
          className={`${styles.btn__checkout} btn btn__primary`}
          onClick={close}
        >
          checkout
        </Link>
      )}
    </article>
  );
}
