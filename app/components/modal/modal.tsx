import styles from "./modal.module.scss";

export default function Modal({ children }: { children: React.ReactNode }) {
  return <section className={styles.modal}>{children}</section>;
}
