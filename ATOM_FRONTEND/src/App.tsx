

 import './App.css'
import HomePage from './pages/HomePage'

import {Routes,Route} from 'react-router-dom'
import { Items } from './pages/ItemsPage'
import Auth from './pages/Auth'
import ProductDetails from './pages/ProductDetails'
import CartPage from './pages/CartPage'




function App() {


  return (
    <div className="App">
    <Routes>
      <Route path='/cart' element={<CartPage></CartPage>}></Route>
     <Route path="/"  element={<HomePage />} />
     <Route path="/Items"  element={<Items/>} />
     <Route path="/auth"  element={<Auth/>} />
     <Route path="/ItemsDetails/:id" element={<ProductDetails/>}/>
     

    </Routes>
     

    </div>
  )
}

export default App
