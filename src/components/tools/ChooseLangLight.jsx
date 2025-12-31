import { useState } from "react";
import { useTranslation } from "react-i18next";
import langImg from "../../assets/img/langBlue.svg";
import arrow from "../../assets/img/arrowBlue.svg";

export default function ChooseLang() {
  const { i18n } = useTranslation();
  const [isActive, setIsActive] = useState(true);
  const [pos, setPos] = useState(false);
  const [lang, setLang] = useState(i18n.language);
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div
      className="langl__wrap"
      onClick={() => {
        setIsActive(!isActive);
      }}
    >
      <div className="langl">
        <img src={langImg} alt="language-icon" />
        <p className="langl-txt">
          {i18n.language}
          <img src={arrow} alt="arrow-icon" />
        </p>
      </div>
      <div
        onClick={(e) => {
      
          setPos(!pos);
          if (lang == "ru") setLang("uz");
          else if (lang == "uz") setLang("ru");

          changeLanguage(lang);
        }}
        className={isActive ? "langl__active la" : "langl__active"}
      >
        <div className="langl__active__wrap">
          <p
            className={
              i18n.language == "uz"
                ? "langl__active__text ltl"
                : "langl__active__text"
            }
          >
            Uz
          </p>
          <p
            className={
              i18n.language == "ru"
                ? "langl__active__text ltl"
                : "langl__active__text"
            }
          >
            Py
          </p>
          <div
            className={
              i18n.language == "ru"
                ? "langl__active__tumb lr"
                : "langl__active__tumb"
            }
          ></div>
        </div>
      </div>
    </div>
  );
}
