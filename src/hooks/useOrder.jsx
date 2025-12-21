import { useState } from "react";
import { createOrder, getOrders } from "../api/order.service";

const useOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const placeOrder = async (orderData) => {
    setLoading(true);
    try {
      const res = await createOrder(orderData);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      return res.data;
    } catch (err) {
      setError(err);
    }
  };

  return {
    placeOrder,
    fetchOrders,
    loading,
    error,
  };
};

export default useOrder;
