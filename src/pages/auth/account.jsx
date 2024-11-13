import React from 'react'
import styles from './Auth.module.css'
import { auth } from '../../utils/firebase'
import { Link } from 'react-router-dom'

const account = () => {
  return (
    <div>
      <Link to='/auth' className={styles.button} onClick={() => auth.signOut()}>sign out</Link>
    </div>
  )
}

export default account
