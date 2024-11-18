import React from 'react'
import Layout from '../../Components/Layout/Layout'
import styles from './Auth.module.css'
import { auth } from '../../utils/firebase'
import { Link } from 'react-router-dom'

// Define the Account component
const Account = () => {

  return (
    // Use the Layout component to wrap the Account content
    <Layout>
      <div className={styles.signout_container}>
        <p className={styles.signout_title}>Your Account</p>
        <p className={styles.signout_text}>Manage your account</p>
        <p className={styles.signout_text}>Customer Service</p>
        <p className={styles.signout_text}>Return Policy</p>
        <p className={styles.signout_text}>Settings</p>
      </div>

      {/* Sign-out link */}
      <Link
        to="/auth"
        className={styles.signout_button}
        onClick={() => auth.signOut()}
      >
        sign out
      </Link>
    </Layout>
  );
}

export default Account