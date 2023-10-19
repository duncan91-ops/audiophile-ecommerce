import Link from "next/link";
import styles from "./page.module.scss";
import { Menu } from "@/components";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={`${styles.hero__container} container`}>
          <article className={styles.hero__content}>
            <p className={styles.hero__new}>new product</p>
            <h1 className={styles.hero__name}>XX99 Mark II HeadphoneS</h1>
            <p className={styles.hero__msg}>
              Experience natural, lifelike audio and exceptional build quality
              made for the passionate music enthusiast.
            </p>
            <Link href="#" className={`${styles.hero__btn} btn btn__primary`}>
              see product
            </Link>
          </article>
        </div>
      </section>
      <section className={`${styles.content} container`}>
        <Menu />
      </section>
    </main>
  );
}
