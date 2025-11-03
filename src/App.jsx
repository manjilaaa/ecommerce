import './App.css'

import Home from './components/Homepage'

import Login from './components/login'
import Collections from './pages/Collections'
import ProductPage from './pages/Product'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductDetails from './pages/productDetails'
import { Toaster } from './components/ui/sonner'
import WishlistPage from './pages/WishList'
import CartPage from './pages/Cart'
import AdminPage from './pages/admin/Adminpage'
import AddProduct from './pages/admin/AddProduct'
import AdminReviews from './pages/admin/AdminReview'
import EditProduct from './pages/admin/EditProduct'
import CheckoutPage from './pages/Checkoutpage'
import AdminOrdersPage from './pages/admin/AdminOrders'
import EditProductForm from './pages/admin/EditProductForm'

function App() {
   const userId = 1; 
  return (
    <Router basename="/ecommerce">
      <div className="App">
       <Toaster richColors position="top-right" />

        <Routes>
  <Route path="/" element={<Login/>} />
  <Route path='/home' element={<Home/>}></Route>
  <Route path="/products" element={<ProductPage />} />
  <Route path='/collections' element={<Collections/>}></Route>
  <Route path='/products/:id' element={<ProductDetails/>}></Route>
  <Route path='/wishlist' element={<WishlistPage/>}></Route>
  <Route path='/cart' element={<CartPage/>}></Route>
  
 
  <Route path='/admin' element={<AdminPage/>}></Route>
  <Route path='/admin/add-product' element={<AddProduct/>}></Route>
  <Route path="/admin/reviews" element={<AdminReviews/>} />
  <Route path="/admin/edit-product" element={<EditProduct />} />        
  <Route path="/admin/products/edit/:id" element={<EditProductForm />} />  
  <Route path="/admin/orders" element={<AdminOrdersPage/>} />

  <Route path="/checkout" element={<CheckoutPage userId={userId} />} />
</Routes>

       
      </div>
    </Router>
  )
}

export default App