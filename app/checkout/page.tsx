"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./page.module.scss";
import { Summary } from "./components";
import { Back } from "@/components";

const schema = yup
  .object({
    name: yup.string().required("required"),
    email: yup.string().required("required").email("wrong format"),
    phone: yup.string().required("required"),
    address: yup.string().required("required"),
    zip: yup
      .string()
      .required("required")
      .test("number", "invalid input", (value, context) => Number(value) >= 0),
    city: yup.string().required("required"),
    country: yup.string().required("required"),
    method: yup.string().required("required"),
    number: yup.string().when("method", {
      is: "emoney",
      then: (schema) =>
        schema
          .required("required")
          .test(
            "number",
            "invalid input",
            (value, context) => Number(value) >= 0
          ),
    }),
    pin: yup.string().when("method", {
      is: "emoney",
      then: (schema) =>
        schema
          .required("required")
          .test(
            "number",
            "invalid input",
            (value, context) => Number(value) >= 0
          ),
    }),
  })
  .required();

export default function Checkout() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      method: "emoney",
    },
  });

  const method = watch("method");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    reset();
  }, [isSubmitSuccessful, reset]);

  const onSubmit = handleSubmit(() => {
    router.push("/regards");
  });

  return (
    <main className={styles.main}>
      <div className="container">
        <Back />
        <form className={styles.form} onSubmit={onSubmit}>
          <section className={styles.checkout}>
            <h1 className={styles.title}>checkout</h1>
            <fieldset className={styles.billing}>
              <legend>billing details</legend>
              <div
                className={`${styles.name} ${styles.input} ${
                  errors.name && styles.error
                }`}
              >
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  placeholder="Alexei Ward"
                />
                {errors.name && (
                  <span className={styles.error}>{errors.name.message}</span>
                )}
              </div>
              <div
                className={`${styles.email} ${styles.input} ${
                  errors.email && styles.error
                }`}
              >
                <label htmlFor="email">Email Address</label>
                <input
                  type="text"
                  id="email"
                  {...register("email")}
                  placeholder="alexei@mail.com"
                />
                {errors.email && (
                  <span className={styles.error}>{errors.email.message}</span>
                )}
              </div>
              <div
                className={`${styles.phone} ${styles.input} ${
                  errors.phone && styles.error
                }`}
              >
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  {...register("phone")}
                  placeholder="+1 202-555-0136"
                />
                {errors.phone && (
                  <span className={styles.error}>{errors.phone.message}</span>
                )}
              </div>
            </fieldset>
            <fieldset className={styles.shipping}>
              <legend>shipping info</legend>
              <div
                className={`${styles.address} ${styles.input} ${
                  errors.address && styles.error
                }`}
              >
                <label htmlFor="address">Your Address</label>
                <input
                  type="text"
                  id="address"
                  {...register("address")}
                  placeholder="1137 Williams Avenue"
                />
                {errors.address && (
                  <span className={styles.error}>{errors.address.message}</span>
                )}
              </div>
              <div
                className={`${styles.zip} ${styles.input} ${
                  errors.zip && styles.error
                }`}
              >
                <label htmlFor="zip">ZIP Code</label>
                <input
                  type="text"
                  id="zip"
                  {...register("zip")}
                  placeholder="10001"
                />
                {errors.zip && (
                  <span className={styles.error}>{errors.zip.message}</span>
                )}
              </div>
              <div
                className={`${styles.city} ${styles.input} ${
                  errors.city && styles.error
                }`}
              >
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  {...register("city")}
                  placeholder="New York"
                />
                {errors.city && (
                  <span className={styles.error}>{errors.city.message}</span>
                )}
              </div>
              <div
                className={`${styles.country} ${styles.input} ${
                  errors.address && styles.error
                }`}
              >
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  {...register("country")}
                  placeholder="United States"
                />
                {errors.country && (
                  <span className={styles.error}>{errors.country.message}</span>
                )}
              </div>
            </fieldset>
            <fieldset className={styles.payment}>
              <legend>payment details</legend>
              <div className={styles.method}>
                <p className={styles.method__title}>payment method</p>
                <div className={styles.method__inputs}>
                  <label className={`${method === "emoney" && styles.checked}`}>
                    e-Money
                    <input
                      type="radio"
                      {...register("method")}
                      value="emoney"
                    />
                    <span className={styles.checkmark}></span>
                  </label>
                  <label className={`${method === "cash" && styles.checked}`}>
                    Cash on Delivery
                    <input type="radio" {...register("method")} value="cash" />
                    <span className={styles.checkmark}></span>
                  </label>
                </div>
              </div>
              {method === "emoney" ? (
                <div className={styles.emoney}>
                  <div
                    className={`${styles.number} ${styles.input} ${
                      errors.number && styles.error
                    }`}
                  >
                    <label htmlFor="number">e-Money Number</label>
                    <input
                      type="text"
                      id="number"
                      {...register("number")}
                      placeholder="238521993"
                    />
                    {errors.number && (
                      <span className={styles.error}>
                        {errors.number.message}
                      </span>
                    )}
                  </div>
                  <div
                    className={`${styles.pin} ${styles.input} ${
                      errors.pin && styles.error
                    }`}
                  >
                    <label htmlFor="pin">e-Money Pin</label>
                    <input
                      type="text"
                      id="pin"
                      {...register("pin")}
                      placeholder="6891"
                    />
                    {errors.pin && (
                      <span className={styles.error}>{errors.pin.message}</span>
                    )}
                  </div>
                </div>
              ) : (
                <div className={styles.cash}>
                  <svg
                    className={styles.cash__icon}
                    width="48"
                    height="48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M46.594 8.438H42.28c-.448 0-.869.213-1.134.574l-2.694 3.674a1.15 1.15 0 1 1-1.848-1.37c2.568-3.53 2.864-3.545 2.864-4.285 0-.779-.636-1.406-1.407-1.406h-5.404a17.658 17.658 0 0 1 9.606-2.813h4.33a1.406 1.406 0 0 0 0-2.812h-4.33c-5.277 0-10.33 2.02-14.142 5.625h-8.34c-.777 0-1.407.63-1.407 1.406v9.938H9.844c-.777 0-1.406.63-1.406 1.406v15.6a14.053 14.053 0 0 0-7.824 3.089 1.406 1.406 0 1 0 1.772 2.185 11.226 11.226 0 0 1 7.048-2.499h3.129c.775 0 1.406.63 1.406 1.406 0 .776-.631 1.407-1.406 1.407H8.436a1.406 1.406 0 0 0 0 2.812h13.728a4.226 4.226 0 0 1-3.977 2.813H1.405a1.406 1.406 0 0 0 0 2.812h16.782c3.395 0 6.236-2.42 6.89-5.625h7.36c.776 0 1.406-.63 1.406-1.406V25.312h9.843c.777 0 1.407-.63 1.407-1.406V11.25h1.5a1.406 1.406 0 0 0 0-2.813ZM33.61 17.599a1.404 1.404 0 0 0-1.172-.63h-3.085c-1.084-1.834.241-4.172 2.381-4.172 2.531 0 3.708 3.115 1.876 4.802ZM21.188 8.437h14.06c-.744 1.03-1.057 1.305-1.352 1.983-4.216-1.779-8.726 2.057-7.559 6.549h-5.15V8.437ZM19.78 19.782h2.813v5.625H19.78v-5.625Zm11.25 19.782h-14.49c.969-2.735-1.07-5.626-3.979-5.626H11.25V19.782h5.719v7.032c0 .776.63 1.406 1.406 1.406H24c.777 0 1.406-.63 1.406-1.407v-7.03h5.625v19.78ZM33.844 22.5v-1.771a5.56 5.56 0 0 0 3.453-4.769 3.954 3.954 0 0 0 3.424-1.611l1.56-2.127V22.5h-8.437Z"
                      fill="#D87D4A"
                    />
                  </svg>
                  <p className={styles.cash__message}>
                    The &apos;Cash on Delivery&apos; option enables you to pay
                    in cash when our delivery courier arrives at your residence.
                    Just make sure your address is correct so that your order
                    will not be cancelled.
                  </p>
                </div>
              )}
            </fieldset>
          </section>
          <section className={styles.summary}>
            <Summary />
            <button
              type="submit"
              className={`${styles.btn__submit} btn btn__primary`}
            >
              {(method === "emoney" && "continue & pay") ||
                (method === "cash" && "continue")}
            </button>
          </section>
        </form>
      </div>
    </main>
  );
}
