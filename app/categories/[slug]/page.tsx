import Link from "next/link";
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
  products = products
    .filter((product) => product.category === params.slug)
    .sort((a, b) => {
      if (b.new && !a.new) {
        return 1;
      } else if (a.new && !b.new) {
        return -1;
      }
      return 0;
    });

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.title}>{params.slug}</h1>
      </section>
      <div className={`${styles.content} container`}>
        <section className={styles.products}>
          {products.map((product) => {
            return (
              <article className={styles.product} key={product.id}>
                <div className={styles.product__img}>
                  <picture>
                    <source
                      media="(min-width: 1280px)"
                      srcSet={product.categoryImage.desktop}
                    />
                    <source
                      media="(min-width: 768px)"
                      srcSet={product.categoryImage.tablet}
                    />
                    <img
                      src={product.categoryImage.mobile}
                      alt="product image"
                      className={styles.img}
                    />
                  </picture>
                </div>
                <div className={styles.product__details}>
                  {product.new && <p className={styles.new}>new product</p>}
                  <h2 className={styles.name}>{product.name}</h2>
                  <p className={styles.description}>{product.description}</p>
                  <Link
                    href={`/products/${product.slug}`}
                    className="btn btn__primary"
                  >
                    see product
                  </Link>
                </div>
              </article>
            );
          })}
        </section>
        <section className={styles.common}>
          <Menu />
          <Caption />
        </section>
      </div>
    </main>
  );
}
