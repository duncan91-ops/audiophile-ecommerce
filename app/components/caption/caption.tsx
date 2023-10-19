import styles from "./caption.module.scss";

export default function Caption() {
  return (
    <article className={styles.caption}>
      <div className={styles.caption__hero}></div>
      <div className={styles.caption__content}>
        <h2 className={styles.caption__title}>
          Bringing you the <span className={styles.best}>best</span> audio gear
        </h2>
        <p className={styles.caption__msg}>
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
    </article>
  );
}
