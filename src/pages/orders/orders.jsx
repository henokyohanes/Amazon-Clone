import React, { useEffect, useContext, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import {db} from '../../utils/firebase'
import {
  doc,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { DataContext } from '../../Components/DataProvider/DataProvider'
import SingleProduct from '../../Components/Products/SingleProduct/SingleProduct';


export default function Orders() {

  const [{user}, dispatch] = useContext(DataContext)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (user) {
      db
        const userOrdersRef = collection(db, "users", user?.uid, "orders");
        const ordersQuery = query(userOrdersRef, orderBy("created", "desc"));

        onSnapshot(ordersQuery, (snapshot) => {
          console.log(snapshot);
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([])
    }
  }, [])
  return (
    <Layout>
      <p>your orders</p>
      <div>
        {orders.length === 0 && <p>no orders yet</p>}
      </div>
      <div>
        {orders.map((order) => ( 
          <div key={order.id}>
            <p>{order.data.created}</p>
            {order.data.cart?.map((item) => (
              <SingleProduct key={item.id} {...item} flex={true}/>
            
              
            ))}
          </div>
        ))}
      </div>
    </Layout>
  )
}
