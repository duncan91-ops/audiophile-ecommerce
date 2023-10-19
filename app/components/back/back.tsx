"use client";

import { useRouter } from "next/navigation";
import styles from "./back.module.scss";

export default function Back() {
  const router = useRouter();

  return (
    <button className={styles.back} type="button" onClick={() => router.back()}>
      go back
    </button>
  );
}
