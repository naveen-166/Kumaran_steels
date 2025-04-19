import React from 'react'
import Navbar from './Components1/Navbar'
import Hero from './Components1/Hero'
import Services from './Components1/Services'
import Products from './Components1/Product'
import About from './Components1/About'
import Contact from './Components1/Contact'
import Footer from './Components1/Footer'

function BaseRoute() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Products />
      <Services />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}

export default BaseRoute
