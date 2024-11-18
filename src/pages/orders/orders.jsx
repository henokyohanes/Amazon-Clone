import React, { useEffect, useContext, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import { db } from '../../utils/firebase'
import {doc, collection, query, orderBy, onSnapshot} from "firebase/firestore";
import { DataContext } from '../../Components/DataProvider/DataProvider'
import SingleProduct from '../../Components/Products/SingleProduct/SingleProduct';
import styles from './Orders.module.css'


const Orders = () => {
  // Destructuring user from DataContext for global state management
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db;
      const userOrdersRef = collection(db, "users", user?.uid, "orders");
      const ordersQuery = query(userOrdersRef, orderBy("created", "desc"));

      // Listen to real-time updates on the orders collection
      onSnapshot(ordersQuery, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    } else {
      setOrders([]);
    }
  }, []);

  return (
    <Layout>
      <div className={styles.orders}>
        <p className={styles.title}>your orders</p>

        {/* Display message if there are no orders */}
        {orders.length === 0 && (
          <div className={styles.divider}>
            <p>no orders yet</p>
          </div>
        )}

        {/* Display orders if available */}
        <div>
          {orders.map((order) => (
            <div key={order.id} className={styles.orders_container}>
              <p className={styles.order_number}>
                Order number - {order.data.created}
              </p>

              {/* Mapping through the cart items in the order */}
              {order.data.cart?.map((item) => (
                <SingleProduct key={item.id} {...item} flex={true} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Orders