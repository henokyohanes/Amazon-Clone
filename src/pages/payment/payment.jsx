import React, { useContext, useState, useRef } from "react";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { FaLock } from "react-icons/fa6";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { axiosInstance } from "../../utils/axios";
import { FadeLoader } from "react-spinners";
import { db } from "../../utils/firebase";
import { doc, setDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ActionTypes } from "../../utils/actionType";
import Layout from "../../Components/Layout/Layout";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import SingleProduct from "../../Components/Products/SingleProduct/SingleProduct";
import logo from "../../assets/Images/amazon-logo-1.png";
import styles from "./Payment.module.css";

const Payment = () => {
  // Extracting global state for user and cart from DataContext
  const [{ user, cart }, dispatch] = useContext(DataContext);

  // Calculating total items and total price in the cart
  const total = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.quantity * item.price, 0);

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null);

  // Custom style for CardElement input field
  const cardElementOptions = {
    style: {
      base: {
        fontSize: "clamp(.8em, 4vw, 1.1em)",
      },
    },
  };

  // Handle the change in CardElement input
  const handleChange = async (event) => {
    event.error ? setError(event.error.message) : setError(null);
  };

  // Handle the payment process
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      setProcessing(true);

      // API call to create a payment session with the total price
      const res = await axiosInstance.post(
        `/payment/create?totalPrice=${totalPrice * 100}`
      );

      // Extract client secret for Stripe payment confirmation
      const clientSecret = res.data.clientSecret;

      // Confirm the payment with the Stripe API
      const confirmation = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      const { paymentIntent } = confirmation;

      // Save order details to Firebase Firestore
      await setDoc(
        doc(collection(db, "users"), user.uid, "orders", paymentIntent.id),
        {
          cart: cart,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        }
      );

      // Dispatch a reset cart action to clear the cart in global state
      dispatch({ type: ActionTypes.RESET_CART });
      setProcessing(false);
      navigate("/orders", { state: { msg: "Payment successful!" } });
    } catch (error) {
      setProcessing(false);
      setError(error.message);
    }
  };

  return (
    <Layout>
      <div className={styles.checkout_header}>

        {/* Checkout header with logo and item count */}
        <img src={logo} alt="amazon logo" className={styles.logo} />
        <p className={styles.checkout_title}>
          Checkout (
          <span className={styles.checkout_count}>{cart && total} items</span>)
        </p>
        <FaLock />
      </div>
      <div className={styles.checkout_address}>

        {/* Shipping address section */}
        <p className={styles.all_titles}>1 - Shipping address</p>
        <div className={styles.address}>
          <p>{user?.email}</p>
          <p>12345 street dr, Houston TX, 77777</p>
          <p>United States</p>
        </div>
        <p className={styles.change}>Change</p>
      </div>
      <div className={styles.checkout_summary}>

        {/* Order summary section */}
        <p className={styles.all_titles}>2 - Order summary</p>
        <div className={styles.products}>
          {cart &&
            cart.map((item) => <SingleProduct key={item.id} {...item} flex />)}
        </div>
      </div>
      <div className={styles.place_order}>

        {/* Order total and terms notice */}
        <span>
          <p className={styles.order_total}>
            order total: <CurrencyFormat value={totalPrice} />
          </p>
          <p className={styles.notice}>
            By placing your order, you agree to my Amazon-clone notice and
            conditions of use.
          </p>
        </span>
      </div>
      <div className={styles.checkout_payment}>
        <p className={styles.all_titles}>3 - Payment method</p>
        <div className={styles.payment}>
          <form onSubmit={handlePayment} ref={formRef}>
            
            {/* Stripe CardElement for credit card input */}
            <CardElement onChange={handleChange} options={cardElementOptions} />
            {error && <small className={styles.error}>{error}</small>}
            <button
              className={styles.place_order_btn}
              type="submit"
              disabled={processing}
            >
              {processing ? <FadeLoader /> : "Place your order"}
            </button>
          </form>
        </div>
        <p className={styles.change}>Change</p>
      </div>
    </Layout>
  );
}

export default Payment