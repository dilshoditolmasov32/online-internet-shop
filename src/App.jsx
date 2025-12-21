import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import HeaderAdaptNav from "./components/header/HeaderAdaptNav";
import Footer from "./components/footer/Footer";
import MediaNav from "./components/media/MediaNav.jsx";
import ProtectedRoute from "./auth/context/ProtectedRoute.jsx";
import Auth from "./auth/Auth";
import { AuthProvider } from "./auth/context/AuthContext";
import {
  Basket,
  Home,
  NotFoundPage,
  Products,
  SingleProduct,
  UserProfile,
} from "./pages";
import "./styles/scss/main.scss";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [isSearch, setIsSearch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);
  return (
    <AuthProvider>
      <Auth />
      <Header
        st={isSearch}
        sfunc={setIsSearch}
        state={isOpen}
        func={setIsOpen}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/products" element={<Products />} />

        <Route path="/basket" element={<Basket />} />

        <Route
          path="/account/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        <Route path="/auth" element={<Auth />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
      <MediaNav />

      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
