

 import './App.css'
import HomePage from './pages/HomePage'

import {Routes,Route} from 'react-router-dom'
import { Items } from './pages/ItemsPage'
import Auth from './pages/Auth'
import ProductDetails from './pages/ProductDetails'
import CartPage from './pages/CartPage'
import UserProfile from './pages/UserProfile'
import ProtectedRoute from './components/ProtectedRoute'
import Contact from './pages/Contact'
import About from './pages/About'




function App() {


  return (
    <div className="App">
    <Routes>

     <Route path="/"  element={<HomePage />} />
     <Route path="/items/:sex?" element={<Items />} />
     <Route path="/auth"  element={<Auth/>} />
     <Route path="/ItemsDetails/:id" element={<ProductDetails/>}/>
     <Route path="/profile" element={<UserProfile/> } />
     <Route path="/cart" element={<CartPage/>}  />
     <Route path='/contact' element={<Contact></Contact>} />
     <Route path='/about' element={<About></About>} />

    </Routes>
     

    </div>
  )
}

export default App
