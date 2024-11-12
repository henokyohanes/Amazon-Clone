import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SingleProduct from './SingleProduct/SingleProduct';
import styles from './Products.module.css'

export default function Products() {

    const [product, setProduct] = useState([]);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(res => {
                setProduct(res.data)
            })
            .catch(err => console.log(err))
    }, []);
    return (
        <div className={styles.product_container}>
            {product.map((product) => (
                <SingleProduct key={product.id} {...product} addButton={true} />
            ))}
        </div>
    )
};
