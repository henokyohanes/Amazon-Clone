import React from 'react'
import { Link } from 'react-router-dom'

export default function Account() {
  return (
    <div>
      <Link to='/auth' className={styles.button} onClick={() => auth.signOut()}>sign out</Link>
    </div>
  )
}
