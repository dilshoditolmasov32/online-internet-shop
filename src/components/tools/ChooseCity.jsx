import React, { useState, useEffect } from 'react';
import Dropbox from '../Dropbox';
import '../../scss/ChooseCity.scss';
import axios from "axios";
import API_BASE_URL from "../../../apiConfig.js";
import useAuthMe from '../../../hooks/useAuthMe.jsx';

export default function ChooseCity({ setAdress }) {
    const { userMe, refetch } = useAuthMe(); // Загружаем текущие данные пользователя
    const districts = [
        'Olmazor tumani', 'Bektemir tumani', 'Mirobod tumani', 'Mirzo Ulug‘bek tumani',
        'Sergeli tumani', 'Chilonzor tumani', 'Shayxontohur tumani', 'Yunusobod tumani',
        'Yakkasaroy tumani', 'Yashnobod tumani', 'Uchtepa tumani'
    ];

    const cities = [
        "Toshkent", "Toshkent viloyati", "Samarqand", "Farg’ona", "Buxoro", "Xorazm",
        "Andijon", "Navoiy", "Qashqadaryo", "Jizzax", "Surxondaryo", "Namangan", "Sirdaryo", "Xiva"
    ];

    // 🔹 Устанавливаем город и район из userMe, если данные есть
    const [userCity, setUserCity] = useState(userMe?.town || "Toshkent");
    const [userDistrict, setUserDistrict] = useState(userMe?.district || "Olmazor tumani");

    // 🔹 Обновляем данные при загрузке (когда `userMe` обновляется)
    useEffect(() => {
        if (userMe?.town) setUserCity(userMe.town);
        if (userMe?.district) setUserDistrict(userMe.district);
    }, [userMe]);

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Токен отсутствует! Войдите заново.");
            return;
        }

        try {
            const response = await axios.patch(
                `${API_BASE_URL}/auth/users/me/`,
                {
                    town: userCity,
                    // district: userCity === "Toshkent" ? userDistrict : districVal
                    district: userDistrict

                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                alert("Манзил сохранён!");
                await refetch();  // 🔹 Обновляем данные пользователя
                setAdress(false); // 🔹 Закрываем выбор города
            } else {
                alert("Ошибка при сохранении адреса!");
            }
        } catch (error) {
            console.error("Ошибка:", error.response?.data || error);
            alert("Ошибка сети или сервера!");
        }
    };

    return (
        <>
            <div className='city'>
                <div className="city__choose">
                    <p className='city__choose-text'>Viloyat / Shahar</p>
                    <Dropbox selected={setUserCity} array={cities} value={userCity} />
                </div>
                <div className="city__choose">
                    <p className='city__choose-text'>Tuman</p>
                    {userCity === 'Toshkent' ? (
                        <Dropbox selected={setUserDistrict} array={districts} value={userDistrict} />
                    ) : (
                        <div className="city__disabled">
                            <input onChange={(e)=>{setUserDistrict(e.value)}} type="text" className='city__disabled-text' />
                        </div>
                    )}
                </div>
            </div>
            <button className='profile__locate__btn' onClick={handleSave}>Saqlash</button>
        </>
    );
}
