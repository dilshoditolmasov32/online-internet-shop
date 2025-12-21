import React, { useState, useEffect } from 'react';
import CodeInput from './CodeInput';
import '../styles/scss/vendors/code.scss';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useTranslation } from 'react-i18next';

export default function Code({ title, setCurrent, setBack, phone, fullName, login }) {
  const [code, setCode] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [resendTimeout, setResendTimeout] = useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    setBack(true);
    title(t('enterCode'));

    // agar modal ichiga kira boshlanganda yangi kod yuborilgan bo'lsa, timerni ishga tushiramiz
    if (isResendDisabled && resendTimeout > 0) {
      const timer = setInterval(() => {
        setResendTimeout((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResendDisabled, resendTimeout, setBack, title, t]);

  // Нажатие на «Подтвердить»
  const handleVerifyCode = async () => {
    try {
      const formattedCode = code.join("").trim(); // Собираем 6 символов

      // Проверяем, что все 6 символов введены
      if (formattedCode.length !== 6) {
        setError("Kod to'liq kiritilmagan!");
        return;
      }

      // Убираем все пробелы и «+» из номера
      let cleanPhone = phone ? phone.replace(/\s/g, "") : "";
      cleanPhone = cleanPhone.replace(/\+/g, "");

      // Отправляем запрос на верификацию
      const response = await fetch(`${api}/auth/verify-code/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: cleanPhone,  // без «+»
          code: formattedCode,
          full_name: fullName,
        })
      });

      // Если сервер вернул ошибку
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.error || "Noto'g'ri kod!");
        return;
      }

      // Успех
      const data = await response.json();
      console.log("verify-code response:", data);

      // Если у вас есть AuthContext.login, вызываем его (он может выполнять навигацию/сейв)
      if (typeof login === "function") {
        // Передаем ответ серверa в login — адаптируйте по своей реализации
        await login(data);
      } else {
        // fallback: сохраняем токен и направляем на профиль
        if (data.access) {
          localStorage.setItem('token', data.access);
        }
        navigate('/account/profile', { replace: true });
      }

      setError("");
      setCurrent("success");
    } catch (err) {
      console.error("Xatolik:", err);
      setError("Server xatosi! Keyinroq urinib ko‘ring.");
    }
  };

  // Нажатие на «Код повторно»
  const handleResendCode = async () => {
    try {
      setIsResendDisabled(true);
      setResendTimeout(120);

      // Снова чистим номер
      let cleanPhone = phone ? phone.replace(/\s/g, "") : "";
      cleanPhone = cleanPhone.replace(/\+/g, "");

      const response = await fetch(`${API_BASE_URL}/auth/send-code/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanPhone })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.error || "Kodni qayta yuborishda xatolik!");
        // Оставляем таймер, пользователь попробует снова
        return;
      }

      setError("");
    } catch (error) {
      console.error(error);
      setError("Tarmoq xatosi! Keyinroq urinib ko‘ring.");
    }
  };

  return (
    <div className="code__wrap">
      <div className="code__top">
        <p className="code__top-text">
          {t("weSent6digitCode")}
        </p>
        <CodeInput code={code} setCode={setCode} length={6} />
      </div>

      {error && <p className="code__error">{error}</p>}
      <a target='_blank' rel="noreferrer" href='https://t.me/online_shop_confirm_bot' className='code__bot'>{t("tgBot")}</a>
      <button className="code__btn" onClick={handleVerifyCode}>
        {t("verify")}
      </button>

      <p className="code__info">
        {t('ifNoCode')} {resendTimeout} {t('receiveInSecs')}
      </p>

      <button
        className="code__btn"
        onClick={handleResendCode}
        disabled={isResendDisabled}
      >
        {isResendDisabled
          ? `${t('reSend')} ${resendTimeout}${t('s')}`
          : t('reSent')
        }
      </button>
    </div>
  );
}