import { useState, useEffect } from 'react';
import api from '../api/axios'; // axios interceptor bilan

export default function useBasket() {
  const [basket, setBasket] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBasket = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get('/customer/cart');
      
      setBasket(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Basket fetch error:', err);
      setError(err.message);
      setLoading(false);
      
      // Agar user login qilmagan bo'lsa, basket bo'sh bo'ladi
      if (err.response?.status === 401) {
        setBasket([]);
      }
    }
  };

  // Basketga mahsulot qo'shish
  const addToBasket = async (productId, quantity = 1) => {
    try {
      const response = await api.post('/basket/add/', {
        product_id: productId,
        quantity: quantity
      });

      // Basketni yangilash
      await fetchBasket();
      return response.data;
    } catch (err) {
      console.error('Add to basket error:', err);
      throw err;
    }
  };

  // Basketdan mahsulot o'chirish
  const removeFromBasket = async (itemId) => {
    try {
      await api.delete(`/basket/${itemId}/`);
      
      // Basketni yangilash
      await fetchBasket();
    } catch (err) {
      console.error('Remove from basket error:', err);
      throw err;
    }
  };

  // Mahsulot miqdorini yangilash
  const updateQuantity = async (itemId, quantity) => {
    try {
      const response = await api.patch(`/basket/${itemId}/`, {
        quantity: quantity
      });

      // Basketni yangilash
      await fetchBasket();
      return response.data;
    } catch (err) {
      console.error('Update quantity error:', err);
      throw err;
    }
  };

  // Basketni tozalash
  const clearBasket = async () => {
    try {
      await api.delete('/basket/clear/');
      setBasket([]);
    } catch (err) {
      console.error('Clear basket error:', err);
      throw err;
    }
  };

  return {
    basket,
    loading,
    error,
    fetchBasket,
    addToBasket,
    removeFromBasket,
    updateQuantity,
    clearBasket
  };
}