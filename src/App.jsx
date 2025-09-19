import './App.css'
import Footer from './components/Footer'
import Home from './components/Homepage'
import Navbar from './components/Navbar'
import Login from './components/login'
import Collections from './pages/Collections'
import ProductPage from './pages/Product'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductDetails from './pages/productDetails'
import { Toaster } from './components/ui/sonner'
import WishlistPage from './pages/WishList'
import CartPage from './pages/Cart'

function App() {
  return (
    <Router>
      <div className="App">
       <Toaster richColors position="top-right" />

        <Routes>
          
          <Route path="/" element={<Login/>} />
          <Route path='/home' element={<Home/>}></Route>
          <Route path="/products" element={<ProductPage />} />
          <Route path='/collections' element={<Collections/>}></Route>
          <Route path='/products/:id' element={<ProductDetails/>}>
         

          </Route>
           <Route path='/wishlist' element={<WishlistPage/>}></Route>
          <Route path="/login" element={<Login />} />
          <Route path='/cart' element={<CartPage/>}> </Route>
        </Routes>
        
       
      </div>
    </Router>
  )
}

export default App