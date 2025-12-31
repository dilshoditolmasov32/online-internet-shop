import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import axios from 'axios';
import info from '../../assets/img/info.svg';
import loc from '../../assets/img/loc.svg';
import ChooseCity from '../tools/ChooseCity.jsx';
import useAuthMe from '../../hooks/useAuthMe.jsx';
import API_BASE_URL from "../../apiConfig.js";

export default function Profile() {
    const {t, i18n} = useTranslation()
    const [adress, setAdress] = useState(false);
    const { userMe, loading, error, refetch } = useAuthMe();
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false); 
    const [errorMessage, setErrorMessage] = useState('');


    const formatPhoneNumber = (number) => {
        let input = number.replace(/\D/g, '').slice(3);
        if (input.length < 2) return input;
        return input.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4').trim();
    };

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
    });

    useEffect(() => {
        if (userMe?.username) {
            setFormData({
                name: userMe.full_name || '',
                phone: formatPhoneNumber(userMe.username),
            });
        }
    }, [userMe]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = (e) => {
        let input = e.target.value.replace(/\D/g, ''); // Оставляем только цифры
        if (input.length > 9) input = input.slice(0, 9); // Ограничиваем длину до 9 цифр

        let formatted = input;
        if (input.length >= 7) {
            formatted = input.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
        } else if (input.length >= 5) {
            formatted = input.replace(/(\d{2})(\d{3})(\d{2})/, '$1 $2 $3');
        } else if (input.length >= 2) {
            formatted = input.replace(/(\d{2})(\d{3})/, '$1 $2');
        }

        setFormData((prev) => ({ ...prev, phone: formatted.trim() }));
    };


    const handleSave = async () => {
        const token = localStorage.getItem('token');
        if (!token) return alert("Токен не найден!");

        let rawPhone = formData.phone.replace(/\s/g, ''); 
        rawPhone = rawPhone.padStart(12, "998"); 

        try {
            await axios.patch(
                `${API_BASE_URL}/auth/users/me/`,
                {
                    full_name: formData.name,
                    username: rawPhone, 
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            setErrorMessage('');
            setIsEditing(false);

            await refetch(); 

        } catch (error) {
            if (error.response) {
                const errorData = error.response.data;
                setErrorMessage(
                    typeof errorData === 'object' && errorData.username
                        ? errorData.username[0]
                        : t("errorSaving")
                );
            } else {
                alert("Ошибка соединения с сервером!");
            }
        }

    };


    const toggleEdit = () => {
        if (isEditing) {
            handleSave();
        } else {
            setIsEditing(true);
        }
    };

    return (
        <div className='profile'>
            <div className="profile__wrap">
                <div className="profile__info">
                    <div className="profile__info__top">
                        <img src={info} alt=""/>
                        <p className='profile__info__top-text'>{t("urInfo")}</p>
                    </div>
                    <div className="profile__info__btm">
                        <div className="profile__info__btm-input">
                            <p className='profile__info__btm-input__text'>{t("firstLastName")}</p>
                            <input
                                className='profile__info__btm-input__inp'
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="profile__info__btm-input">
                            <p className='profile__info__btm-input__text'>{t("telNumber")}</p>
                            <div className="profile__info__btm-input__wrap">
                                <p className='profile__info__btm-input__num'>+998</p>
                                <input
                                    type="text"
                                    className='profile__info__btm-input__tel'
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    maxLength={12}
                                    disabled={!isEditing}
                                />
                            </div>
                            {errorMessage && <p className='profile__info__btm-input__error' style={{color:"red"}}>{errorMessage}</p>}
                        </div>
                    </div>
                    <button className='profile__locate__btn' onClick={toggleEdit}>
                        {isEditing ? t("save") : t("change")}
                    </button>
                </div>

                <div className="profile__locate">
                    <div className="profile__locate__top">
                        <img src={loc} alt="" />
                        <p className='profile__locate__top-text'>{t("urAddres")}</p>
                    </div>
                    {isEditingAddress ? (
                        <ChooseCity setAdress={setIsEditingAddress} />
                    ) : userMe?.town ? (
                        <>
                            <div className="profile__locate__btm">
                                <div>
                                    <p className='city__choose-text'>{t("addresCity")}</p>
                                    <p className='profile__info__btm-input__inp'>{userMe.town || "—"}</p>
                                </div>
                                <div>
                                    <p className='city__choose-text'>{t("addresTuman")}</p>
                                    <p className='profile__info__btm-input__inp'>{userMe.district || "—"}</p>
                                </div>
                            </div>
                            <button
                                className='profile__locate__btn'
                                onClick={() => setIsEditingAddress(true)}
                            >
                                {t("change")}
                            </button>
                        </>
                    ) : (
                        adress ? (
                            <ChooseCity setAdress={setAdress}/>
                        ) : (
                            <button className='profile__locate__btn' onClick={() => setAdress(true)}>
                               {t("addAddres")}
                            </button>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
