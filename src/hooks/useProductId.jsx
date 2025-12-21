import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from "../apiConfig.js";

const useProductId = ({ product_id }) => {
    const [product, setProduct] = useState([]); // Состояние для хранения новостей
    const [loading, setLoading] = useState(true); // Состояние для загрузки
    const [error, setError] = useState(null); // Состояние для ошибок

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/products/${product_id}`)
                setProduct(response.data); // Сохраняем данные новостей
                setLoading(false); // Завершаем загрузку
            } catch (error) {
                setError(error); // Если произошла ошибка, сохраняем её
                setLoading(false); // Завершаем загрузку
            }
        };

        fetchNews(); // Вызов функции для получения новостей
    }, []); // Пустой массив, чтобы запрос выполнялся один раз при монтировании компонента

    return { product, loading, error }; // Возвращаем данные, состояние загрузки и ошибки
};

export default useProductId;
