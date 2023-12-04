"use client";

import styles from "./page.module.scss";
import { Summary } from "./components";
import { Back } from "@/components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    address: yup.string().required(),
    zip: yup.number().required(),
    city: yup.string().required(),
    country: yup.string().required(),
    method: yup.string().required(),
    number: yup.number().positive().optional(),
    pin: yup.number().positive().optional(),
  })
  .required();

export default function Checkout() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      method: "emoney",
    },
  });

  const method = watch("method");

  const onSubmit = handleSubmit((data) => {
    console.log(data);
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
              <div className={`${styles.name} ${styles.input}`}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  placeholder="Alexei Ward"
                />
              </div>
              <div className={`${styles.email} ${styles.input}`}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="text"
                  id="email"
                  {...register("email")}
                  placeholder="alexei@mail.com"
                />
              </div>
              <div className={`${styles.phone} ${styles.input}`}>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  {...register("phone")}
                  placeholder="+1 202-555-0136"
                />
              </div>
            </fieldset>
            <fieldset className={styles.shipping}>
              <legend>shipping info</legend>
              <div className={`${styles.address} ${styles.input}`}>
                <label htmlFor="address">Your Address</label>
                <input
                  type="text"
                  id="address"
                  {...register("address")}
                  placeholder="1137 Williams Avenue"
                />
              </div>
              <div className={`${styles.zip} ${styles.input}`}>
                <label htmlFor="zip">ZIP Code</label>
                <input
                  type="text"
                  id="zip"
                  {...register("zip")}
                  placeholder="10001"
                />
              </div>
              <div className={`${styles.city} ${styles.input}`}>
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  {...register("city")}
                  placeholder="New York"
                />
              </div>
              <div className={`${styles.country} ${styles.input}`}>
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  {...register("country")}
                  placeholder="United States"
                />
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
                  <div className={`${styles.number} ${styles.input}`}>
                    <label htmlFor="number">e-Money Number</label>
                    <input
                      type="text"
                      id="number"
                      {...register("number")}
                      placeholder="238521993"
                    />
                  </div>
                  <div className={`${styles.pin} ${styles.input}`}>
                    <label htmlFor="pin">e-Money Pin</label>
                    <input
                      type="text"
                      id="pin"
                      {...register("pin")}
                      placeholder="6891"
                    />
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
