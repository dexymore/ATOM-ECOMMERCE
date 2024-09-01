

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
import { Toaster } from 'react-hot-toast'
import { NotFound } from './pages/NotFound'
import { useEffect } from 'react'
import { useDispatch } from "react-redux";
import verifyUserThunk from './store/authThunks'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'



function App() {
const dispatch = useDispatch()
useEffect(() => {
  dispatch(verifyUserThunk())
}, [dispatch])
  return (
    <div className="App">

<Toaster
        position="bottom-left"
        reverseOrder={false}
        toastOptions={{
          style: {
            padding: "16px 48px",
            color: "#ffffff", // Default text color
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            fontSize: "20px",
          },
          success: {
            style: {
              border: "1px solid #48BB30",
              color: "#ffffff", // Text color for success toast
              backgroundColor: "#48BB78",
            },
          },
          error: {
            style: {
              border: "1px solid #F56565",
              color: "#ffffff", // Text color for error toast
              backgroundColor: "#F56565", // Background color for error toast
            },
          },
        }}
      />
    <Routes>

     <Route path="/"  element={<HomePage />} />
     <Route path="/items" element={<Items />} />
     <Route path="/auth"  element={<Auth/>} />
     <Route path="/ItemsDetails/:id" element={<ProductDetails/>}/>
     <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
     <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
     <Route path='/contact' element={<Contact></Contact>} />
     <Route path='/about' element={<About></About>} />
     <Route path='/forgot-password' element={<ForgetPassword></ForgetPassword>} />
    <Route path='/reset-password/:token' element={<ResetPassword></ResetPassword>} />
     <Route path='*' element={<NotFound></NotFound>} />

    </Routes>
     

    </div>
  )
}

export default App
