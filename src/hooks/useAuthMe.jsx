import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";

const useAuthMe = () => {
  const [userMe, setUserMe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserMe = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUserMe(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data } = await api.get("customer/get");
      setUserMe(data);
      setError(null);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        setUserMe(null);
      }
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserMe();
  }, [fetchUserMe]);

  return {
    userMe,
    loading,
    error,
    refetch: fetchUserMe,
  };
};

export default useAuthMe;
