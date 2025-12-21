import { useState } from "react";
import { toast } from "react-toastify";
// Joy UI/MUI imports
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import CheckIcon from "@mui/icons-material/Check";
// Boshqa imports
import { useTranslation } from "react-i18next";
import PhoneInput from "../inputs/PhoneInput";
import formaImage from "../../assets/img/formImg.png";
import galka from "../../assets/img/toast.svg";
import cancel from "../../assets/img/cancel.svg";
import "../../styles/scss/components/tost.scss";
import "../../styles/scss/layout/form.scss";

// Option stillari (o'zgartirishsiz)
const optionSx = {
  px: 2.5,
  py: 1.5,
  fontSize: 14,
  fontFamily: "Neometric",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#F5F5F7",
  },
  "&[aria-selected='true']": {
    fontWeight: 500,
    color: "#10355B",
    backgroundColor: "#FFFFFF",
  },
  "& svg": {
    opacity: 0,
  },
  "&[aria-selected='true'] svg": {
    opacity: 1,
  },
};

export default function Form() {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const { t } = useTranslation();
  const [userCity, setUserCity] = useState("toshkent-shahri"); // Default qiymatni to'g'ri value ga o'rnatamiz

  // Ism kiritishdagi notog'ri RegEx ni to'g'irlash uchun
  const handleNameChange = (e) => {
    // Faqat harflar, bo'shliqlar va apostrof kabi belgilar qolishi mumkin
    const cleanedValue = e.target.value.replace(/[^a-zA-Z\s'\-]/g, "");
    setName(cleanedValue);
  };

  const handleSend = async () => {
    // Telefon raqami tekshiruvini faqat kiritilgan bo'lishiga va minimal uzunlikka tekshiramiz
    if (name.trim() !== "" && tel.length >= 15 && userCity != null) {
      // ⚠️ Xavfsizlik bo'yicha eslatma: Bot Tokenni server orqali yashiring!
      const botToken = "8139440344:AAERuskhG8X2Ed-YdR8171JsTT5xXMYiD00";
      const chatId = "-1002689018491";
      const text = `📝 Новая заявка:\n Имя: ${name}\n Телефон: ${tel}\n Город: ${userCity}`;

      try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: "HTML",
          }),
        });

        toast(
          <div className="tost">
            <img src={galka} alt="Done" />
            <span className="tost__text">Успешно отправлено на проверку</span>
          </div>,
          {
            style: {
              width: "100%",
              padding: "10px",
              background: "none",
              boxShadow: "none",
            },
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: false,
            icon: false,
          }
        );
      } catch (err) {
        console.error("Ошибка отправки в Telegram:", err);
        toast(
          <div className="tost">
            <img src={cancel} alt="Error" />
            <span className="tost__text-red">
              Ошибка при отправке. Попробуйте позже.
            </span>
          </div>,
          {
            style: {
              width: "100%",
              padding: "10px",
              background: "none",
              boxShadow: "none",
            },
            autoClose: 3000,
            closeButton: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            icon: false,
          }
        );
      }
    } else {
      // Majburiy maydonlar to'ldirilmagan holat
      toast(
        <div className="tost">
          <img src={cancel} alt="Error" />
          <span className="tost__text-red">
            Заполнено с ошибкой, повторите попытку
          </span>
        </div>,
        {
          style: {
            width: "100%",
            padding: "10px",
            background: "none",
            boxShadow: "none",
          },
          autoClose: 3000,
          closeButton: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          icon: false,
        }
      );
    }
  };

  return (
    <div className="form">
      <div className="container">
        <div className="form__wrap">
          <div className="form__desc" data-aos="fade-right">
            <div className="form__desc-txts">
              <h2 className="form__desc-txts__title">{t("formTitle")}.</h2>
              <p className="form__desc-txts__text">{t("formText")}</p>
            </div>
            <div className="form__desc-main">
              <input
                onChange={handleNameChange}
                value={name}
                type="text"
                placeholder={t("firstLastName")}
                className="form__desc-main__inp"
              />

              <PhoneInput changeTel={setTel} />

              <Select
                placeholder="Tanlang"
                indicator={<KeyboardArrowDown />}
                value={userCity}
                onChange={(e, newValue) => setUserCity(newValue)}
                sx={{
                  flex: 1,
                  width: "100%",
                  background: "#fff",
                  borderRadius: "10px",

                  "--Select-radius": "10px",
                  "--Select-minHeight": "62px",
                  "--Select-paddingInline": {
                    sm: "16px ",
                    md: "25px",
                  },

                  border: "none",
                  boxShadow: "0 0 0 1px #E4E4E7",

                  fontSize: {
                    sm: "14px",
                    md: "16px",
                  },
                  lineHeight: "24px",
                  color: "#000",

                  "&:hover": {
                    background: "#fff",
                    border: "none",
                    boxShadow: "0 0 0 1px #D4D4D8",
                    outline: "none",
                  },

                  "&.Mui-focused": {
                    boxShadow: "none",
                    border: "none",
                  },

                  [`& .${selectClasses.indicator}`]: {
                    color: "#7D7D7D",
                    [`&.${selectClasses.expanded}`]: {
                      transform: "rotate(-180deg)",
                    },
                  },
                }}
                slotProps={{
                  listbox: {
                    sx: {
                      mt: 0.5,
                      p: 0,
                      borderRadius: "12px",
                      border: "1px solid #E4E4E7",
                      boxShadow: "0px 16px 40px rgba(15, 23, 42, 0.16)",
                    },
                  },
                }}
              >
                <Option value="toshkent-shahri" sx={optionSx}>
                  Toshkent shahri
                  <CheckIcon fontSize="small" />
                </Option>
                <Option value="toshkent-viloyati" sx={optionSx}>
                  Toshkent viloyati
                  <CheckIcon fontSize="small" />
                </Option>
                <Option value="qashqadaryo" sx={optionSx}>
                  Qashqadaryo
                  <CheckIcon fontSize="small" />
                </Option>
                <Option value="surxondaryo" sx={optionSx}>
                  Surxondaryo
                  <CheckIcon fontSize="small" />
                </Option>
                <Option value="jizzax" sx={optionSx}>
                  Jizzax
                  <CheckIcon fontSize="small" />
                </Option>
              </Select>
              {/* Yuborish tugmasi */}
              <button className="form__desc-main__btn" onClick={handleSend}>
                {t("formBtn")}
              </button>
            </div>
          </div>
          <div className="form__img">
            <img src={formaImage} alt="formaImage" id="sofa-image" />
          </div>
          
        </div>
      </div>
    </div>
  );
}
