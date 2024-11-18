import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth'
import Account from './pages/Auth/Account'
import Payment from './pages/Payment/Payment'
import Orders from './pages/Orders/Orders'
import Cart from './pages/Cart/Cart'
import Results from './pages/Results/Results'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"; 

// Loading the Stripe public key from environment variables
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Routing = () => {
  return (
    <Router>
      <Routes>
        {/* Defining routes for different pages */}
        <Route exact path='/' element={<Home />} />
        <Route exact path='/auth' element={<Auth />} />
        <Route exact path='/account' element={<Account />} />
        <Route exact path='/payment' element={<ProtectedRoute msg="Please login first" redirect="/payment"> <Elements stripe={stripePromise}> <Payment /> </Elements> </ProtectedRoute>} />
        <Route exact path='/orders' element={<ProtectedRoute msg="Please login first" redirect="/orders"> <Orders /> </ProtectedRoute>} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/category/:categoryName' element={<Results />} />
        <Route exact path='/products/:productId' element={<ProductDetail />} />
      </Routes>
    </Router>
  )
}

export default Routing