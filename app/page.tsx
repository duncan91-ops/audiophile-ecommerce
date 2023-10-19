import styles from "./page.module.scss";
import { Menu } from "@/components";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}></section>
      <section className={`${styles.content} container`}>
        <Menu />
      </section>
    </main>
  );
}
