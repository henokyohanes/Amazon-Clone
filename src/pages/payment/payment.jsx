import React, { useContext, useState } from "react";
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
      <div>
        <img src="" alt="amazon logo" />
        <p>
          Checkout (<span>{cart && total} items</span>)
        </p>
        <FaLock />
      </div>
      <div>
        <p>Delivery address</p>
        <div>
          <p>{user?.email}</p>
          <p>123456</p>
          <p>12121</p>
          <p>tx</p>
        </div>
      </div>
      <div>
        <p>Payment method</p>
        <div>
          <form onSubmit={handlePayment}>
            {error && <small>{error}</small>}
            <CardElement onChange={handleChange} />
          </form>
        </div>
      </div>
      <div>
        <p>Order summary</p>
        <div>
          {cart &&
            cart.map((item) => (
              <SingleProduct key={item.id} {...item} flex />
            ))}
        </div>
            <div>
              <span>
                total order: <CurrencyFormat value={totalPrice} />
              </span>
            </div>
            <button type="submit" disabled={processing}>
              {processing ? <FadeLoader /> : "Pay"}
            </button>
      </div>
    </Layout>
  );
}
