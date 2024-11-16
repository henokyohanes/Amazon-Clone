import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import SingleProduct from "../../Components/Products/SingleProduct/SingleProduct";
import Loader from "../../Components/Loader/Loader";
import styles from "./Results.module.css";

export default function Results() {
  const [result, setresult] = useState([]);
  const [Loadeing, setLoadering] = useState(false);
  const { categoryName } = useParams();

  useEffect(() => {
    setLoadering(true);
    axios
      .get(`https://fakestoreapi.com/products/category/${categoryName}`)
      .then((res) => {
        setresult(res.data);
        setLoadering(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categoryName]);
  return (
    <Layout>
      {Loadeing && <Loader />}
      <p className={styles.title}>Category / {categoryName}</p>
      <div className={styles.products}>
        {result.map((product) => (
          <SingleProduct key={product.id} {...product} addButton={true} />
        ))}
      </div>
    </Layout>
  );
}
