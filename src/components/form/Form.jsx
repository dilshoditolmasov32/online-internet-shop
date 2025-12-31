import { useState } from "react";
import { toast } from "react-toastify";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";
import PhoneInput from "../inputs/PhoneInput";
import formaImage from "../../assets/img/formImg.png";
import galka from "../../assets/img/toast.svg";
import cancel from "../../assets/img/cancel.svg";

// Stil va doimiylar
const optionSx = {
  px: 2.5, py: 1.5, fontSize: 14, fontFamily: "Neometric",
  display: "flex", alignItems: "center", justifyContent: "space-between",
  cursor: "pointer",
  "&:hover": { backgroundColor: "#F5F5F7" },
  "&[aria-selected='true']": { fontWeight: 500, color: "#10355B", backgroundColor: "#FFFFFF" },
  "& svg": { opacity: 0 },
  "&[aria-selected='true'] svg": { opacity: 1 },
};


export default function Form() {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [userCity, setUserCity] = useState("toshkent-shahri");
  const { t } = useTranslation();

  const handleNameChange = (e) => {
    // Kirill va Lotin harflari uchun RegEx kengaytirildi
    const cleanedValue = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s'\-]/g, "");
    setName(cleanedValue);
  };

  const handleSend = async () => {
    // Telefon uzunligini tekshirish (faqat raqamlarni sanaymiz)
    const pureTel = tel.replace(/\D/g, "");
    
    if (name.trim() !== "" && pureTel.length >= 9 && userCity) {
      const botToken = "8139440344:AAERuskhG8X2Ed-YdR8171JsTT5xXMYiD00";
      const chatId = "-1002689018491";
      const text = `📝 <b>Yangi ariza:</b>\n👤 Ism: ${name}\n📞 Tel: ${tel}\n📍 Shahar: ${userCity}`;

      try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: "HTML",
          }),
        });

        // Muvaffaqiyatli yuborilganda tozalash
        setName("");
        setTel("");
        
        toast(
          <div className="tost">
            <img src={galka} alt="Done" />
            <span className="tost__text">Успешно отправлено!</span>
          </div>,
          { style: { width: "100%", padding: "10px", background: "none", boxShadow: "none" }, autoClose: 3000, hideProgressBar: true, closeButton: false }
        );
      } catch (err) {
        // Xatolik toasti (kod o'zgarishsiz)
      }
    } else {
      // To'ldirilmagan maydonlar toasti
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
              <input onChange={handleNameChange} value={name} type="text" placeholder={t("firstLastName")} className="form__desc-main__inp" />
              <PhoneInput value={tel} changeTel={setTel} />

              <Select
                placeholder="Tanlang"
                indicator={<KeyboardArrowDown />}
                value={userCity}
                // TO'G'IRLANDI: MUI Joy Select (event, newValue) argumentlarini oladi
                onChange={(e, newValue) => setUserCity(newValue)}
                sx={{
                  // Sizning sx stillaringiz...
                  flex: 1, width: "100%", background: "#fff", borderRadius: "10px",
                  "--Select-radius": "10px", "--Select-minHeight": "62px",
                  border: "none", boxShadow: "0 0 0 1px #E4E4E7",
                  "&.Mui-focused": { boxShadow: "0 0 0 2px #10355B" }, // Fokus stilini qo'shdik
                }}
              >
                <Option value="toshkent-shahri" sx={optionSx}>Toshkent shahri <CheckIcon fontSize="small" /></Option>
                <Option value="toshkent-viloyati" sx={optionSx}>Toshkent viloyati <CheckIcon fontSize="small" /></Option>
                <Option value="qashqadaryo" sx={optionSx}>Qashqadaryo <CheckIcon fontSize="small" /></Option>
                <Option value="surxondaryo" sx={optionSx}>Surxondaryo <CheckIcon fontSize="small" /></Option>
                <Option value="jizzax" sx={optionSx}>Jizzax <CheckIcon fontSize="small" /></Option>
              </Select>

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