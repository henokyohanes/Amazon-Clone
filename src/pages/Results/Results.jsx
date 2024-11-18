import React, { useState, useEffect } from "react";
import SingleProduct from "../../Components/Products/SingleProduct/SingleProduct";
import Layout from "../../Components/Layout/Layout";
import Loader from "../../Components/Loader/Loader";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./Results.module.css";

const Results = () => {
  const [result, setresult] = useState([]);
  const [Loadeing, setLoadering] = useState(false);
  const { categoryName } = useParams();

  // useEffect hook to fetch product data based on category when the component mounts or categoryName changes
  useEffect(() => {
    setLoadering(true);
    axios
      // Making GET request to fetch products by category from the API
      .get(`https://fakestoreapi.com/products/category/${categoryName}`)
      .then((res) => {
        setresult(res.data);
        setLoadering(false);
      })
      .catch((err) => {});
  }, [categoryName]);
  return (
    <Layout>
      {/* Show Loader component while data is loading */}
      {Loadeing && <Loader />}

      {/* Category Name Title */}
      <p className={styles.title}>Category / {categoryName}</p>

      {/* Product list section, mapping over result array to render SingleProduct components for each product */}
      <div className={styles.products}>
        {result.map((product) => (
          <SingleProduct key={product.id} {...product} addButton={true} />
        ))}
      </div>
    </Layout>
  );
}

export default Results