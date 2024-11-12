import React from 'react'
import Rating from '@mui/material/Rating'
import { IoIosArrowDown } from "react-icons/io";
import CurrencyFormat from '../../CurrencyFormat/CurrencyFormat'
import styles from '../Products.module.css'

export default function SingleProduct({ image, id, title, rating, price}) {


  const addtocart = () => {
    dispatch({ type: ActionTypes.ADD_TO_CART, item: { image, id, title, rating, price, description } })
  }

  return (
    <div className={styles.product} key={styles.product}>
      <div>
        <a>
          <img className={styles.image} src={image} alt="Product image" />
        </a>
      </div>
      <div>
        <p className={styles.title}>{title}</p>
        <div className={styles.rating}>
          <Rating
            value={rating?.rate || 0}
            precision={0.1}
            sx={{ fontSize: { xs: "2.2vw", sm: "1.2vw" } }}
          />
          <IoIosArrowDown className={styles.arrow} />
          <p className={styles.count}>{rating?.count || 0}</p>
        </div>
        <div className={styles.price}>
          <CurrencyFormat value={price} />
        </div>
        <button className={styles.button} onClick={addtocart}>Add to Cart</button>
      </div>
    </div>
  );
}
