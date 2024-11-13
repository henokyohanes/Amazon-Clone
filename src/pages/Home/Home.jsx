import React from 'react'
import Layout from '../../Components/Layout/Layout'
import Carousel from '../../Components/Carousel/Carousel'
import Catagories from '../../Components/Categories/Categories'
import Products from '../../Components/Products/Products'

const Home = () => {
  return (
    <Layout>
      <Carousel />
      <Catagories />
      <Products />
    </Layout>
  )
}

export default Home