import React, { useEffect, useState } from 'react'
import langImg from "../../assets/img/lang.svg"
import arrow from '../../assets/img/arrow.png'
import "../../styles/scss/components/lang.scss"
import { useTranslation } from 'react-i18next';
export default function ChooseLang() {
    const { t, i18n } = useTranslation();
    const [isActive, setIsActive] = useState(true)
    const [pos, setPos] = useState(false)
    const [lang, setLang] = useState(i18n.language)
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
    return (
        <div className="lang__wrap" onClick={() => { setIsActive(!isActive) }}>
            <div className="lang">
                <img src={langImg} alt="" />
                <p className='lang-txt'>
                   
                    {i18n.language}
                    <img src={arrow} alt="" />
                </p>

            </div>
            <div onClick={(e) => {
                //скрывать/не скрывать после клика
                //e.stopPropagation()
                setPos(!pos)
                if (lang == 'ru')
                    setLang('uz')
                else if (lang == 'uz')
                    setLang('ru')

                changeLanguage(lang)

            }} className={isActive ? "lang__active la" : "lang__active"}>
                <div className="lang__active__wrap">
                    <p className={i18n.language == 'uz' ? 'lang__active__text lt' : 'lang__active__text'}>Uz</p>
                    <p className={i18n.language == 'ru' ? 'lang__active__text lt' : 'lang__active__text'}>Py</p>
                    <div className={i18n.language == 'ru' ? "lang__active__tumb lr" : "lang__active__tumb"}>

                    </div>
                </div>
            </div>
        </div>



    )
}
