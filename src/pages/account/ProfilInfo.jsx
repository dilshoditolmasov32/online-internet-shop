import { useState } from "react";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import CheckIcon from "@mui/icons-material/Check";
import userAboutIcon from "../../assets/img/user-about.svg";
import locationIcon from "../../assets/img/location.svg";

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

function ProfileInfo() {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [fullName, setFullName] = useState("Odilov Muhammaddbobur");
  const [phone, setPhone] = useState("880 80 80");
  const [region, setRegion] = useState("Toshkent shahri");
  const [district, setDistrict] = useState("Yakkasaroy tumani");

  const handleAddAddress = () => {
    setShowAddressForm(!showAddressForm);
  };

  return (
    <div className="profile-info">
      <div className="profile-card">
        <div className="profile-card__header">
          <div>
            <img src={userAboutIcon} alt="user icon" />
          </div>
          <h2 className="profile-card__title">Sizning ma'lumotlaringiz</h2>
        </div>

        <div className="profile-card__grid profile-card__grid--two">
          <div className="profile-field">
            <label className="profile-field__label">Ism va familiya</label>
            <input
              className="profile-input"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="profile-field profile-field--phone">
            <div className="label-title">
              <label className="profile-field__label">Telefon</label>
              <span className="profile-field__helper">
                SMS kod orqali tasdiqlangan
              </span>
            </div>
            <div className="phone-wrapper">
              <span className="phone-code">+998</span>
              <input
                className="input-phone"
                type="tel"
                value={phone}
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      <div className="profile-card">
        <div className="profile-card__header">
          <div>
            <img src={locationIcon} alt="location icon" />
          </div>
          <h2 className="profile-card__title">Sizning manzilingiz</h2>
        </div>

        <div className="profile-card__grid profile-card__grid--two profile-address__form">
          <div className="profile-field">
            <label className="profile-field__label">Viloyat / shahar</label>

            <Select
              placeholder="Tanlang"
              indicator={<KeyboardArrowDown />}
              sx={{
                flex: 1,
                width: "100%",
                background: "#F5F5F7",
                borderRadius: "12px",
                "--Select-radius": "12px",
                "--Select-minHeight": "52px",
                "--Select-paddingInline": "20px",
                fontSize: {
                  sm: "14px",
                  md: "16px",
                },
                lineHeight: "24px",
                color: "#000",
                boxShadow: "0 0 0 1px #E4E4E7",
                "&:hover": {
                  boxShadow: "0 0 0 1px #D4D4D8",
                },
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
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
          </div>
          <div className="profile-field">
            <label className="profile-field__label">Tuman</label>
            <Select
              placeholder="Tanlang"
              indicator={<KeyboardArrowDown />}
              sx={{
                flex: 1,
                width: "100%",
                background: "#F5F5F7",
                borderRadius: "12px",
                "--Select-radius": "12px",
                "--Select-minHeight": "52px",
                "--Select-paddingInline": "20px",
                fontSize: "16px",
                lineHeight: "24px",
                color: "#000",
                boxShadow: "0 0 0 1px #E4E4E7",
                "&:hover": {
                  boxShadow: "0 0 0 1px #D4D4D8",
                },
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
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
                Bustonliq
                <CheckIcon fontSize="small" />
              </Option>
              <Option value="toshkent-viloyati" sx={optionSx}>
                Samarqand
                <CheckIcon fontSize="small" />
              </Option>
              <Option value="qashqadaryo" sx={optionSx}>
                Kasbi
                <CheckIcon fontSize="small" />
              </Option>
              <Option value="surxondaryo" sx={optionSx}>
                Qamashi
                <CheckIcon fontSize="small" />
              </Option>
              <Option value="jizzax" sx={optionSx}>
                Qo'qon
                <CheckIcon fontSize="small" />
              </Option>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
