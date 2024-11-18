import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SingleProduct from './SingleProduct/SingleProduct';
import styles from './Products.module.css'

// Define the Products functional component
const Products = () => {

    const [product, setProduct] = useState([]);

    // useEffect to fetch data when the component mounts
    useEffect(() => {

        // Make a GET request to fetch products from the fake store API
        axios.get('https://fakestoreapi.com/products')
            .then(res => {
                setProduct(res.data)
            })

            // Log any errors during the request
            .catch(err => console.log(err))
    }, []);
    return (
        // Main container for displaying all products
        <div className={styles.product_container}>
            {product.map((product) => (
                <SingleProduct key={product.id} {...product} addButton={true} />
            ))}
        </div>
    )
};

export default Products