"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./menu.module.scss";
import { getCategories } from "@/utils/getCategories";

export default function Menu({ close }: { close?: () => void }) {
  const categories = getCategories();

  return (
    <article className={styles.menu}>
      <ul className={styles.items}>
        {categories.map(({ id, name, image }) => {
          return (
            <li key={id} className={styles.item}>
              <Link
                href={`/categories/${name}`}
                className={styles.link}
                onClick={(e) => {
                  close && close();
                }}
              ></Link>
              <div className={styles.img_container}>
                <Image
                  src={image}
                  alt="category image"
                  fill
                  className={styles.img}
                />
              </div>
              <span className={styles.name}>{name}</span>
              <button className={`${styles.btn} btn__tertiary`}>
                <span>shop</span>
                <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.322 1l5 5-5 5"
                    stroke="#D87D4A"
                    strokeWidth="2"
                    fill="none"
                    fillRule="evenodd"
                  />
                </svg>
              </button>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
