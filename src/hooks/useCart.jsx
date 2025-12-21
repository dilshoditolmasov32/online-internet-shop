import { useState } from "react";
import { addToCart } from "../api/cart.service"; 
const useCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addItem = async (productId, quantity) => {
    setLoading(true);
    setError(null);
    try {
      const response = await addToCart(productId, quantity);
      // Bu yerda agar Redux yoki Context bo'lsa, savatni yangilash kodi bo'ladi
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err; // Xatoni komponentga uzatamiz
    } finally {
      setLoading(false);
    }
  };

  return { addItem, loading, error };
};

export default useCart;