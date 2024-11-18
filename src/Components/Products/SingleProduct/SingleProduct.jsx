import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../../CurrencyFormat/CurrencyFormat";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { DataContext } from "../../DataProvider/DataProvider";
import { ActionTypes } from "../../../utils/actionType";
import styles from "../Products.module.css";

// Define the SingleProduct functional component
const SingleProduct = ({image, id, title, rating, price, description, flex, detail, addButton,}) => {
  const [state, dispatch] = useContext(DataContext);

  // Function to handle adding product to cart
  const addtocart = () => {
    dispatch({
      type: ActionTypes.ADD_TO_CART,
      item: { image, id, title, rating, price, description },
    });
  };

  // Function to scroll the page to the top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    // Main container with dynamic layout based on the 'flex' prop
    <div
      className={flex ? styles.flex_product : styles.product}
      key={styles.product}
    >
      {/* Product image section */}
      <div>
        <Link to={`/products/${id}`} onClick={scrollToTop}>
          <img className={styles.image} src={image} alt="Product image" loading="lazy"/>
        </Link>
      </div>

      {/* Product details section */}
      <div>
        <Link to={`/products/${id}`} onClick={scrollToTop}>
          <p className={styles.title}>{title}</p>
        </Link>

        {/* Conditionally render product description */}
        {detail && <p className={styles.description}>{description}</p>}

        {/* Rating section */}
        <div className={styles.rating}>
          <Rating
            value={rating?.rate || 0}
            precision={0.1}
            sx={{ fontSize: { xs: "2.5vw", sm: "1.5vw" } }}
          />
          <IoIosArrowDown className={styles.arrow} />
          <p className={styles.count}>{rating?.count || 0}</p>
        </div>

        {/* Price section */}
        <div className={styles.price}>
          <CurrencyFormat value={price} />
        </div>

        {/* Add to Cart button (conditionally rendered) */}
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
