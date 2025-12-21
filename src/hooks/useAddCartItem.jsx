import { useState } from 'react';
import axios from 'axios';
import api from '../api/axios.js';
import useAuthMe from './useAuthMe.jsx';

const useAddCartItem = () => {
    const { error: authError } = useAuthMe();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addCartItem = async ({ product_id, amount = 1 }) => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }

        try {
            const response = await axios.post(
                `${api}/basket/`,
                {
                    product_id: product_id,  // Было "product", теперь "product_id"
                    amount: amount,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            return response.data;
        } catch (err) {
            console.error("Ошибка запроса:", err.response ? err.response.data : err.message);
            throw err;
        }
    };

    return {    addCartItem, loading, error };
};

export default useAddCartItem;
