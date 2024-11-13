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

export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/auth" element={<Auth />} />
        <Route exact path="/account" element={<Account />} />
        <Route exact path="/payment" element={<Payment />} />
        <Route exact path="/orders" element={<Orders />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/category/:categoryName" element={<Results />} />
        <Route exact path="/products/:productId" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

