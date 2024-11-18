import React, { useState, useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import logo from "../../assets/Images/amazon-logo-1.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../utils/firebase";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { ActionTypes } from "../../utils/actionType";
import { BeatLoader } from "react-spinners";
import styles from "./Auth.module.css";

// Auth Component: Handles user sign-in and account creation
const Auth = () => {
  // Define the Auth component
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ signin: false, signup: false });

  // Destructure user and dispatch from the global data context
  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();

  // Access location state for conditional redirection and messages
  const { state: navstate } = useLocation();

  // Function to handle authentication (sign-in or sign-up)
  const handleAuth = async (e) => {
    e.preventDefault();

    // Validate that both email and password are provided
    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    // Determine the action type (sign-in or sign-up) based on button name
    const actionType = e.target.name === "signin" ? "signin" : "signup";
    setLoading({ ...loading, [actionType]: true });

    try {
      // Perform Firebase authentication based on the action type
      const userCredential =
        actionType === "signin"
          ? await signInWithEmailAndPassword(auth, email, password)
          : await createUserWithEmailAndPassword(auth, email, password);

      // Update global state with the authenticated user's information
      dispatch({ type: ActionTypes.SET_USER, user: userCredential.user });
      setLoading({ ...loading, [actionType]: false });
      navigate(navstate?.redirect || "/");
    } catch (error) {
      // Capture and display error messages from Firebase
      setError(error.message);
      setLoading({ ...loading, [actionType]: false });
    }
  };

  return (
    <Layout>
      <div className={styles.auth}>
        <Link to="/">
          <img className={styles.logo} src={logo} alt="Amazon logo" loading="lazy"/>
        </Link>
        <div className={styles.container}>
          <h1 className={styles.title}>Sign in</h1>
          {navstate?.msg && (
            <small className={styles.msg}>{navstate?.msg}</small>
          )}

          {/* Sign-in form */}
          <form className={styles.form}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className={styles.button}
              name="signin"
              type="button"
              onClick={handleAuth}
            >
              {loading.signin ? <BeatLoader size={8} /> : "Sign In"}
            </button>
          </form>
          <p className={styles.text}>
            By signing-in, you agree to my Amazon-clone Conditions of Use and
            Privacy Notice.
          </p>
        </div>
        <p className={styles.account_text}>New to Amazon?</p>

        {/* Sign-up button */}
        <button
          className={styles.account_button}
          name="signup"
          type="button"
          onClick={handleAuth}
        >
          {loading.signup ? (
            <BeatLoader size={8} />
          ) : (
            "Create your Amazon account"
          )}
        </button>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </Layout>
  );
};

export default Auth;