import styles from "./page.module.scss";
import { getProducts } from "@/utils/getProducts";
import { Caption, Menu, Back } from "@/components";

export async function generateStaticParams() {
  const products = getProducts();

  return products.map((product) => ({ slug: product.slug }));
}

export default function Product({ params }: { params: { slug: string } }) {
  const products = getProducts();
  const product = products.find((product) => product.slug === params.slug);

  return (
    <main className={`${styles.main} container`}>
      <Back />
      <div className={styles.content}>
        <section className={styles.product}>
          <article className={styles.product__content}>
            <div className={styles.product__details}></div>
            <div className={styles.product__features}></div>
            <div className={styles.product__accompaniments}></div>
          </article>
          <article className={styles.product__gallery}></article>
          <article className={styles.product__alternatives}></article>
        </section>
        <section className={styles.common}>
          <Menu />
          <Caption />
        </section>
      </div>
    </main>
  );
}
