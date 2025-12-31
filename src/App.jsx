import AOS from "aos";
import { useEffect, useState, lazy, Suspense } from "react";
import { ToastContainer, Zoom } from "react-toastify";
import { Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MediaNav from "./components/media/MediaNav.jsx";

import Auth from "./auth/Auth";
import ProtectedRoute from "./auth/context/ProtectedRoute.jsx";
import { AuthProvider } from "./auth/context/AuthContext";

import "./styles/scss/main.css";
import "aos/dist/aos.css";

const Home = lazy(() => import("./pages/home/Home.jsx"));
const Products = lazy(() => import("./pages/products/Products"));
const SingleProduct = lazy(() => import("./pages/single-page/SingleProduct"));
const Basket = lazy(() => import("./pages/basket/Basket.jsx"));
const UserProfile = lazy(() => import("./pages/account/UserProfile"));
const NotFoundPage = lazy(() => import("./pages/404/NotFoundPage.jsx"));

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
      <Suspense
        fallback={<p style={{ textAlign: "center" }}>Yuklanmoqda...</p>}
      >
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
      </Suspense>

      <Footer />
      <MediaNav />

      <ToastContainer
        position="bottom-right"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
    </AuthProvider>
  );
}

export default App;
