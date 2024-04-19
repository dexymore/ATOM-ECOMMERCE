

 import './App.css'
import HomePage from './pages/HomePage'

import {Routes,Route} from 'react-router-dom'
import { Items } from './pages/ITEMS'
import Auth from './pages/Auth'
import ProductDetails from './pages/ProductDetails'




function App() {


  return (
    <div className="App">
    <Routes>
     <Route path="/"  element={<HomePage />} />
     <Route path="/Items"  element={<Items/>} />
     <Route path="/auth"  element={<Auth/>} />
     <Route path="/ItemsDetails/:id" element={<ProductDetails/>}/>
     

    </Routes>
     

    </div>
  )
}

export default App
