import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../api/axios';

const useProductsImages = ({ product_id }) => {
    const [productImages, setProductsImages] = useState([]); // Состояние для хранения новостей
    const [loading, setLoading] = useState(true); // Состояние для загрузки
    const [error, setError] = useState(null); // Состояние для ошибок

    useEffect(() => {
        // Запрос на получение новостей
        const fetchNews = async () => {
            try {
                const response = await axios.get(`${api}/product_images/product/${product_id}/`); // Полный URL
                setProductsImages(response.data); // Сохраняем данные новостей
                // console.log(productImages)
                setLoading(false); // Завершаем загрузку
            } catch (error) {
                setError(error); // Если произошла ошибка, сохраняем её
                setLoading(false); // Завершаем загрузку
            }
        };

        fetchNews(); // Вызов функции для получения новостей
    }, [product_id]); // Пустой массив, чтобы запрос выполнялся один раз при монтировании компонента

    return { productImages, loading, error }; // Возвращаем данные, состояние загрузки и ошибки
};

export default useProductsImages;
