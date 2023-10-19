import { getCategories } from "@/utils/getCategories";
import styles from "./page.module.scss";
import { getProducts } from "@/utils/getProducts";
import { Menu, Caption } from "@/components";

export async function generateStaticParams() {
  const categories = getCategories();

  return categories.map((category) => ({
    slug: category.name,
  }));
}

export default function Category({ params }: { params: { slug: string } }) {
  let products = getProducts();
  products = products.filter((product) => product.category === params.slug);

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.title}>{params.slug}</h1>
      </section>
      <div className={`${styles.content} container`}>
        <section className={styles.products}></section>
        <section className={styles.common}>
          <Menu />
          <Caption />
        </section>
      </div>
    </main>
  );
}
