import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar.tsx';
import Footer from './components/Footer.tsx';

import { Provider } from 'react-redux';
import store from './store/index.ts';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <BrowserRouter>
  <Provider store={store}>

  <NavBar></NavBar>
      <App />
      <Footer />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
