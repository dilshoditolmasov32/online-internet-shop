import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import Create from "./Create";
import Login from "./Login";
import Code from "./Code";
import left from "../assets/img/left.svg";
import cls from "../assets/img/close.svg";
import "../styles/scss/pages/auth.scss"

export default function Auth() {
  const { isAuthOpen, closeAuth, login } = useContext(AuthContext);

  const [current, setCurrent] = useState("create");
  const [backBtn, setBackBtn] = useState(false);
  const [title, setTitle] = useState("Create account");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");

  // Modal ochiq/yopiq bo'lganda body scroll ni boshqarish
  useEffect(() => {
    if (isAuthOpen) {
      // Modal ochilganda scroll o'chirish
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      // Modal yopilganda scroll qaytarish
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [isAuthOpen]);

  if (!isAuthOpen) return null;
  
  return (
    <div className="auth__outer">
      <div className="auth" onClick={() => closeAuth()}>
        <div className="auth__wrap" onClick={(e) => e.stopPropagation()}>
          <div className="auth__desc">
            <p className="auth__desc-text">
              {backBtn ? (
                <img
                  onClick={() => {
                    setCurrent("create");
                    setBackBtn(false);
                    setTitle("Create account");
                  }}
                  className="auth__desc-text__back"
                  src={left}
                  alt="back"
                />
              ) : null}
              {title}
            </p>
            <img src={cls} onClick={() => closeAuth()} alt="close" />
          </div>

          <div className="auth__child">
            {current === "create" ? (
              <Create
                title={setTitle}
                setCurrent={setCurrent}
                setBack={setBackBtn}
                phone={phone}
                setPhone={setPhone}
                setFullName={setFullName}
                login={login}
              />
            ) : current === "login" ? (
              <Login
                title={setTitle}
                setCurrent={setCurrent}
                setBack={setBackBtn}
                phone={phone}
                setPhone={setPhone}
                login={login}
              />
            ) : current === "code" ? (
              <Code
                title={setTitle}
                setCurrent={setCurrent}
                setBack={setBackBtn}
                phone={phone}
                fullName={fullName}
                login={login}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}