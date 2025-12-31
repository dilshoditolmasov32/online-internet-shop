import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

export default function ModalLogout({ onConfirm, onClose, onCloseFunc }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  

  const handleConfirm = () => {
    navigate("/");
  };

 

  return (
    <div className="modal-logout">
      <div className="modal-logout__wrapper">
        <h2 className="modal-logout__title">{t("logout")}</h2>
        <p className="modal-logout__message">
          {t("Are you sure you want to log out?")}
        </p>
        <div className="modal-logout__actions">
          <button
            className="modal-logout__button modal-logout__button--cancel"
            onClick={onCloseFunc}
          >
            {t("no")}
          </button>
          <button
            className="modal-logout__button modal-logout__button--confirm"
            onClick={handleConfirm}
          >
            {t("yes")}
          </button>
        </div>
      </div>
    </div>
  );
}
