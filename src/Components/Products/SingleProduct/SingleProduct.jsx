import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import { IoIosArrowDown } from "react-icons/io";
import CurrencyFormat from "../../CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import styles from "../Products.module.css";

const SingleProduct = ({image, id, title, rating, price, description, flex, detail, addButton,}) => {

  const addtocart = () => {
    dispatch({
      type: ActionTypes.ADD_TO_CART,
      item: { image, id, title, rating, price, description },
    });
  };

  return (
    <div
      className={flex ? styles.flex_product : styles.product}
      key={styles.product}
    >
      <div>
        <Link to={`/products/${id}`}>
          <img className={styles.image} src={image} alt="Product image" />
        </Link>
      </div>
      <div>
        <p className={styles.title}>{title}</p>
        {detail && <p className={styles.description}>{description}</p>}
        <div className={styles.rating}>
          <Rating
            value={rating?.rate || 0}
            precision={0.1}
            sx={{ fontSize: { xs: "2.5vw", sm: "1.5vw" } }}
          />
          <IoIosArrowDown className={styles.arrow} />
          <p className={styles.count}>{rating?.count || 0}</p>
        </div>
        <div className={styles.price}>
          <CurrencyFormat value={price} />
        </div>
        {addButton && (
          <button className={styles.button} onClick={addtocart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default SingleProduct
