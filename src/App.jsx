import React from 'react'
import Header from './Components/Header/Header';
import Carousel from './Components/Carousel/Carousel';
import Catagories from './Components/Categories/Categories';
import Footer from './Components/Footer/Footer';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fontsource/montserrat";
import './App.css'

const App = () => {

  return (
    <>
      <Header />
      <Carousel />
      <Catagories />
      <Footer />
    </>
  )
}

export default App
