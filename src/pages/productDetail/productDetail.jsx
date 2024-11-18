import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import SingleProduct from "../../Components/Products/SingleProduct/SingleProduct";
import Loader from "../../Components/Loader/Loader";
import styles from "./ProductDetail.module.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [Loadeing, setLoadering] = useState(false);

  // useEffect hook to fetch product data when the component mounts or productId changes
  useEffect(() => {
    setLoadering(true);
    axios
      // Making GET request to fetch product details from the API
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setLoadering(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productId]);
  return (
    <Layout>
      {/* Show Loader component while data is loading */}
      {Loadeing && <Loader />}
      <p className={styles.title}>Product Detail</p>
      
      {/* Product detail section, passing product data and additional props to SingleProduct component */}
      <div className={styles.product_detail}>
        <SingleProduct {...product} flex={true} detail={true} addButton={true}/>
      </div>
    </Layout>
  );
}

export default ProductDetail