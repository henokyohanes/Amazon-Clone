import React, { useContext, useState, useRef } from "react";
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { FaLock } from "react-icons/fa6";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { axiosInstance } from "../../utils/axios";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { FadeLoader } from "react-spinners";
import { db } from "../../utils/firebase";
import { doc, setDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ActionTypes } from "../../utils/actionType";
import SingleProduct from "../../Components/Products/SingleProduct/SingleProduct";
import logo from "../../assets/Images/amazon-logo-1.png";
import styles from "./Payment.module.css";

export default function Payment() {
  const [{ user, cart }, dispatch] = useContext(DataContext);
  const total = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null); // Create a form reference

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "clamp(.8em, 4vw, 1.1em)"
      },
    },
  };

  const handleChange = async (event) => {
    event.error ? setError(event.error.message) : setError(null);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      const res = await axiosInstance.post(
        `/payment/create?totalPrice=${totalPrice * 100}`
      );

      const clientSecret = res.data.clientSecret;

      const confirmation = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      const { paymentIntent } = confirmation;
      console.log("PaymentIntent:", paymentIntent);
      console.log("user:", user.uid);

      console.log("start");

      await setDoc(
        doc(collection(db, "users"), user.uid, "orders", paymentIntent.id),
        {
          cart: cart,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        }
      );

      dispatch({ type: ActionTypes.RESET_CART });
      console.log("end");
      setProcessing(false);
      navigate("/orders", { state: { msg: "Payment successful!" } });
    } catch (error) {
      setProcessing(false);
      setError(error.message);
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className={styles.checkout_header}>
        <img src={logo} alt="amazon logo" className={styles.logo} />
        <p className={styles.checkout_title}>
          Checkout (
          <span className={styles.checkout_count}>{cart && total} items</span>)
        </p>
        <FaLock />
      </div>
      <div className={styles.checkout_address}>
        <p className={styles.all_titles}>1 - Shipping address</p>
        <div className={styles.address}>
          <p>{user?.email}</p>
          <p>12345 street dr, Houston TX, 77777</p>
          <p>United States</p>
        </div>
        <p className={styles.change}>Change</p>
      </div>
      <div className={styles.checkout_payment}>
        <p className={styles.all_titles}>2 - Payment method</p>
        <div className={styles.payment}>
          <form onSubmit={handlePayment}>
            <CardElement onChange={handleChange} options={cardElementOptions} />
            {error && <small className={styles.error}>{error}</small>}
          </form>
        </div>
        <p className={styles.change}>Change</p>
      </div>
      <div className={styles.checkout_summary}>
        <p className={styles.all_titles}>3 - Order summary</p>
        <div className={styles.products}>
          {cart &&
            cart.map((item) => <SingleProduct key={item.id} {...item} flex />)}
        </div>
      </div>
      <div className={styles.place_order}>
        <button
          className={styles.place_order_btn}
          type="submit"
          disabled={processing}
          onClick={() => formRef.current.requestSubmit()}
        >
          {processing ? <FadeLoader /> : "place your order"}
        </button>
        <span>
          <p className={styles.order_total}>order total: <CurrencyFormat value={totalPrice} /></p>
          <p className={styles.notice}>By placing your order, you agree to my Amazon-clone notice and conditions of use.</p>
        </span>
      </div>
    </Layout>
  );
}
