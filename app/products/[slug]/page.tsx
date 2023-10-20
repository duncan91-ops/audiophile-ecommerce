import Link from "next/link";
import styles from "./page.module.scss";
import { getProducts } from "@/utils/getProducts";
import { Caption, Menu, Back } from "@/components";
import { AddToCart } from "../components";

export async function generateStaticParams() {
  const products = getProducts();

  return products.map((product) => ({ slug: product.slug }));
}

export default function Product({ params }: { params: { slug: string } }) {
  const products = getProducts();
  const product = products.find((product) => product.slug === params.slug);

  if (!product) {
    return (
      <main className={`${styles.main} container`}>
        <Back />
        <p className={styles.error}>Error</p>
        <div className={styles.content}>
          <section className={styles.common}>
            <Menu />
            <Caption />
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className={`${styles.main} container`}>
      <Back />
      <div className={styles.content}>
        <section className={styles.product}>
          <article className={styles.product__content}>
            <div className={styles.product__details}>
              <div className={styles.product__img}>
                <div className={styles.container}>
                  {/* <Image
                    src={product.image.mobile}
                    alt="product image"
                    className={styles.img}
                    fill
                    object-fit="contain"
                  /> */}
                  <picture>
                    <source
                      media="(min-width: 1280px)"
                      srcSet={product.image.desktop}
                    />
                    <source
                      media="(min-width: 768px)"
                      srcSet={product.image.tablet}
                    />
                    <img
                      className={styles.img}
                      src={product.image.mobile}
                      alt="product image"
                    />
                  </picture>
                </div>
              </div>
              <div className={styles.product__info}>
                {product.new && <p className={styles.new}>new product</p>}
                <h1 className={styles.name}>{product.name}</h1>
                <p className={styles.description}>{product.description}</p>
                <p className={styles.price}>
                  $ {product.price.toLocaleString()}
                </p>
              </div>
              <AddToCart productId={product.id} />
            </div>
            <div className={styles.product__features}>
              <h3 className={styles.title}>features</h3>
              <div className={styles.features}>
                {product.features.split("\n\n").map((feature) => {
                  return (
                    <p className={styles.feature} key={feature}>
                      {feature}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className={styles.product__accompaniments}>
              <h3 className={styles.title}>in the box</h3>
              <ul className={styles.items}>
                {product.includes.map(({ item, quantity }) => {
                  return (
                    <li key={item} className={styles.item}>
                      <span className={styles.item__quantity}>{quantity}x</span>
                      <span className={styles.item__name}>{item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>
          <article className={styles.product__gallery}>
            <div className={styles.first}>
              <picture>
                <source
                  media="(min-width: 1280px)"
                  srcSet={product.gallery.first.desktop}
                />
                <source
                  media="(min-width: 768px)"
                  srcSet={product.gallery.first.tablet}
                />
                <img
                  className={styles.first__img}
                  src={product.gallery.first.mobile}
                  alt="first gallery image"
                />
              </picture>
            </div>
            <div className={styles.second}>
              <picture>
                <source
                  media="(min-width: 1280px)"
                  srcSet={product.gallery.second.desktop}
                />
                <source
                  media="(min-width: 768px)"
                  srcSet={product.gallery.second.tablet}
                />
                <img
                  className={styles.second__img}
                  src={product.gallery.second.mobile}
                  alt="first gallery image"
                />
              </picture>
            </div>
            <div className={styles.third}>
              <picture>
                <source
                  media="(min-width: 1280px)"
                  srcSet={product.gallery.third.desktop}
                />
                <source
                  media="(min-width: 768px)"
                  srcSet={product.gallery.third.tablet}
                />
                <img
                  className={styles.third__img}
                  src={product.gallery.third.mobile}
                  alt="first gallery image"
                />
              </picture>
            </div>
          </article>
          <article className={styles.product__alternatives}>
            <h2 className={styles.title}>you may also like</h2>
            <div className={styles.others}>
              {product.others.map((other) => {
                return (
                  <div className={styles.other} key={other.slug}>
                    <div className={styles.other__img}>
                      <div className={styles.container}>
                        <picture>
                          <source
                            media="(min-width: 1280px)"
                            srcSet={other.image.desktop}
                          />
                          <source
                            media="(min-width: 768px)"
                            srcSet={other.image.tablet}
                          />
                          <img
                            className={styles.img}
                            src={other.image.mobile}
                            alt="product alternative image"
                          />
                        </picture>
                      </div>
                    </div>
                    <h4 className={styles.other__name}>{other.name}</h4>
                    <Link
                      href={`/products/${other.slug}`}
                      className="btn btn__primary"
                    >
                      see product
                    </Link>
                  </div>
                );
              })}
            </div>
          </article>
        </section>
        <section className={styles.common}>
          <Menu />
          <Caption />
        </section>
      </div>
    </main>
  );
}
