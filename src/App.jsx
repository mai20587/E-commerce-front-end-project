import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { ProductDetails } from './Pages/ProductDetails/ProductDetails'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './Pages/Home/Home';
import { Container } from 'react-bootstrap'
import { Footer } from './components/Footer/Footer'
import { GlobalNavbar } from './components/GlobalNavbar/GlobalNavbar'
import { Products } from './Pages/Products/Products'
import Topheader from './components/Header/Header'
import Login from './Pages/Login/Login'
import { Cart } from './Pages/Cart/Cart'
import { Toaster } from 'react-hot-toast';
 
  

 
 
function App() {
 

  return (
    <>
    <Toaster position='top-right'/>
    <Container className='min-vh-100'>
         
      <Topheader/> 
     <GlobalNavbar/>
  <Routes>
   
    <Route Component={Home} path="/" />
    <Route Component={Products} path="/products" />
    <Route Component={ProductDetails} path="/product-details/:id" />
    <Route Component={Login} path="/login" /> 
    <Route Component={Cart} path="/cart" /> 
   

  </Routes>
  </Container>
  <Footer/>
    </>
  )
}

export default App
