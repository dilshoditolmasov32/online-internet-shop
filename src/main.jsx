import { CartProvider } from "./components/cart/CartContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import './i18n';
import React from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>

 <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
  <ToastContainer position="bottom-right" />
  </CartProvider>
);
