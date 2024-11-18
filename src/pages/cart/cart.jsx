import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import Layout from '../../Components/Layout/Layout'
import SingleProduct from '../../Components/Products/SingleProduct/SingleProduct'
import styles from './Cart.module.css'
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
import { ActionTypes } from '../../utils/actionType'

const Cart = () => {
  // Destructuring cart and user from DataContext for global state management
  const [{ cart, user }, dispatch] = useContext(DataContext);

  // Increment quantity of item in the cart
  const increment = (item) => {
    dispatch({ type: ActionTypes.ADD_TO_CART, item: { ...item, quantity: 1 } });
  };

  // Decrement quantity of item in the cart
  const decrement = (item) => {
    dispatch({
      type: ActionTypes.REMOVE_FROM_CART,
      item: { ...item, quantity: 1 },
    });
  };

  return (
    <Layout>
      <div className={styles.cart}>
        <p className={styles.title}>Shopping Cart</p>

        {/* Divider for displaying cart content or empty state */}
        <div className={styles.cart_divider}>
          {cart?.length === 0 ? (
            <div className={styles.cart_empty}>
              <p className={styles.empty_title}>Your cart is empty</p>
              <Link to="/">
                <button className={styles.empty_btn}>Shop now</button>
              </Link>
            </div>
          ) : (
            <div className={styles.cart_container}>
              {cart?.map((item) => (
                <div key={item.id} className={styles.cart_item}>
                  <SingleProduct {...item} flex={true} addButton={false} />
                  <div>
                    {/* Quantity controls for the cart item */}
                    <button
                      className={styles.button}
                      onClick={() => decrement(item)}
                    >
                      -
                    </button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <button
                      className={styles.button}
                      onClick={() => increment(item)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Displaying the total and checkout button if there are items in the cart */}
          {cart?.length > 0 && (
            <div className={styles.cart_total}>
              <div>
                <span className={styles.total_title}>
                  Subtotal ({cart?.length} items) :
                </span>
                <span className={styles.total_price}>
                  <CurrencyFormat
                    value={cart?.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )}
                  />
                </span>
              </div>
              <p className={styles.gift}>
                <input type="checkbox" />
                This order contains a gift
              </p>
              <Link className={styles.checkout} to="/payment">
                Proceed to Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Cart