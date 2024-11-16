import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import { IoIosArrowDown } from "react-icons/io";
import CurrencyFormat from "../../CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import styles from "../Products.module.css";
import { DataContext } from "../../DataProvider/DataProvider";
import { ActionTypes } from "../../../utils/actionType";

const SingleProduct = ({image, id, title, rating, price, description, flex, detail, addButton,}) => {

  const [state, dispatch] = useContext(DataContext);

  const addtocart = () => {
    dispatch({
      type: ActionTypes.ADD_TO_CART,
      item: { image, id, title, rating, price, description },
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling effect
    });
  };

  return (
    <div
      className={flex ? styles.flex_product : styles.product}
      key={styles.product}
    >
      <div>
        <Link to={`/products/${id}`} onClick={scrollToTop}>
          <img className={styles.image} src={image} alt="Product image" />
        </Link>
      </div>
      <div>
        <Link to={`/products/${id}`} onClick={scrollToTop}>
          <p className={styles.title}>{title}</p>
        </Link>
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
