import Link from "next/link";
import styles from "./page.module.scss";
import { Caption, Menu } from "@/components";

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
            <Link
              href="/products/xx99-mark-two-headphones"
              className={`${styles.hero__btn} btn btn__primary`}
            >
              see product
            </Link>
          </article>
        </div>
      </section>
      <section className={`${styles.content} container`}>
        <Menu />
        <article className={styles.showcase}>
          <div className={styles.one}>
            <div className={styles.one__content}>
              <h3 className={styles.one__name}>
                <span>ZX9</span> <span>SPEAKER</span>
              </h3>
              <p className={styles.one__msg}>
                Upgrade to premium speakers that are phenomenally built to
                deliver truly remarkable sound.
              </p>
              <Link
                href="/products/zx9-speaker"
                className={`${styles.one__btn} btn`}
              >
                see product
              </Link>
            </div>
          </div>
          <div className={styles.two}>
            <div className={styles.two__content}>
              <h3 className={styles.two__name}>ZX7 SPEAKER</h3>
              <Link
                href="/products/zx7-speaker"
                className={`${styles.two__btn} btn btn__secondary`}
              >
                see product
              </Link>
            </div>
          </div>
          <div className={styles.three}>
            <div className={styles.three__hero}></div>
            <div className={styles.three__content}>
              <div className={styles.three__details}>
                <h3 className={styles.three__name}>YX1 EARPHONES</h3>
                <Link
                  href="/products/yx1-earphones"
                  className={`${styles.three__btn} btn btn__secondary`}
                >
                  see product
                </Link>
              </div>
            </div>
          </div>
        </article>
        <Caption />
      </section>
    </main>
  );
}
