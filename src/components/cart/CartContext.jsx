import { createContext, useContext, useState, useEffect } from "react";
import { getCart, addToCart } from "../../api/cart.service"; 
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCartItems(res.data.items || []); 
    } catch (err) {
      console.error("Savatni yuklashda xato:", err);
    }
  };

  const addItem = async (productId, quantity) => {
    setLoading(true);
    try {
      await addToCart(productId, quantity);
      await fetchCart(); 
      toast.success("Savatga qo'shildi!");
    } catch (err) {
      toast.error(err.message || "Xatolik yuz berdi");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, addItem, loading, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);