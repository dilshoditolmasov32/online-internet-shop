import { useTranslation } from "react-i18next";
import { useContext, useState, useEffect } from "react";
import Create from "./Create";
import { AuthContext } from "./context/AuthContext";
import Code from "./Code";
import Login from "./Login";

export default function AuthModal() {
  const { isAuthOpen, closeAuth, login } = useContext(AuthContext);

  const { t } = useTranslation();

  const [current, setCurrent] = useState("create");
  const [backBtn, setBackBtn] = useState(false);
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    if (!isAuthOpen) {
      setCurrent("create");
    }
  }, [isAuthOpen]);

  if (!isAuthOpen) return null;

  const handleBack = () => {
    if (current === "code" || current === "login") {
      setCurrent("create");
      setBackBtn(false);
    }
  };

  return (
    <div className={isAuthOpen ? "auth__outer" : "auth__dis"}>
      <div className="auth" onClick={closeAuth}>
        <div className="auth__wrap" onClick={(e) => e.stopPropagation()}>
          <div className="auth__desc">
            <div className="auth__desc-left">
              {backBtn && (
                <img
                  onClick={handleBack}
                  className="auth__desc-text__back"
                  src={"/icons/left.svg"}
                  alt="back"
                />
              )}
              <p className="auth__desc-text">{title}</p>
            </div>
            <img
              src={"/icons/close.svg"}
              className="auth__close-icon"
              onClick={closeAuth}
              alt="close"
            />
          </div>

          <div className="auth__child">
            {current === "create" && (
              <Create
                title={setTitle}
                setCurrent={setCurrent}
                setBack={setBackBtn}
                phone={phone} 
                setPhone={setPhone} 
                setFullName={setFullName}
              />
            )}

            {current === "login" && (
              <Login
                title={setTitle}
                setCurrent={setCurrent}
                setBack={setBackBtn}
                phone={phone}
                setPhone={setPhone}
              />
            )}

            {current === "code" && (
              <Code
                title={setTitle}
                setCurrent={setCurrent}
                setBack={setBackBtn}
                phone={phone}
                fullName={fullName}
                login={login} // AuthContext'dan kelgan login funksiyasi
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
