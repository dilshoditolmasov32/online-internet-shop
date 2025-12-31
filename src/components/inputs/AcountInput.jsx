import { useState } from "react";
import { useTranslation } from "react-i18next";
const PhoneInput = ({ phone, setPhone }) => {
    const { i18n, t } = useTranslation()
    const [isFocused, setIsFocused] = useState(false); 

    const formatPhoneNumber = (value) => {
        let cleaned = value.replace(/\D/g, "");
        if (!cleaned.startsWith("998")) {
            cleaned = "998" + cleaned;
        }

        cleaned = cleaned.slice(0, 12);

        let formatted = `+${cleaned.slice(0, 3)}`;
        if (cleaned.length > 3) formatted += ` ${cleaned.slice(3, 5)}`;
        if (cleaned.length > 5) formatted += ` ${cleaned.slice(5, 8)}`;
        if (cleaned.length > 8) formatted += ` ${cleaned.slice(8, 10)}`;
        if (cleaned.length > 10) formatted += ` ${cleaned.slice(10, 12)}`;

        return formatted;
    };

    const handleChange = (e) => {
        const formattedNumber = formatPhoneNumber(e.target.value);
        setPhone(formattedNumber);
    };

    const handleFocus = () => {
        setIsFocused(true);
        if (phone === "") setPhone("+998 ");
    };

    const handleBlur = () => {
        if (phone === "+998 ") setPhone("");
        setIsFocused(false);
    };

    return (
        <input
            type="tel"
            className="phone-input"
            value={phone}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={!isFocused ? t("telNumber") : ""}
            maxLength={17}
        />
    );
};

export default PhoneInput;
