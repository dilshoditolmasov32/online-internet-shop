import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from "../apiConfig.js";

const useAuth = () => {
    const [user, setUser] = useState([]); // Состояние для хранения новостей
    const [loading, setLoading] = useState(true); // Состояние для загрузки
    const [error, setError] = useState(null); // Состояние для ошибок

    useEffect(() => {
        // Запрос на получение новостей
        const fetchNews = async () => {
            try {
                const response = await axios.post(`${API_BASE_URL}/auth/token/login`,
                    { username: 'shohruh', password: '111' }
                ); // Полный URL
                setUser(response.data.results); // Сохраняем данные новостей
                setLoading(false); // Завершаем загрузку
            } catch (error) {
                setError(error); // Если произошла ошибка, сохраняем её
                setLoading(false); // Завершаем загрузку
            }
        };

        fetchNews(); // Вызов функции для получения новостей
    }, []); // Пустой массив, чтобы запрос выполнялся один раз при монтировании компонента

    return { user, loading, error }; // Возвращаем данные, состояние загрузки и ошибки
};

export default useAuth;
