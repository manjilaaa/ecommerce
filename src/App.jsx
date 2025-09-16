import './App.css'
import Footer from './components/Footer'
import Home from './components/Homepage'
import Navbar from './components/Navbar'
import Login from './components/login'
import Collections from './pages/Collections'
import ProductPage from './pages/Product'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductDetails from './pages/productDetails'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path='/collections' element={<Collections/>}></Route>
          <Route path='/products/:id' element={<ProductDetails/>}>

          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
        
        <Footer/>
      </div>
    </Router>
  )
}

export default App