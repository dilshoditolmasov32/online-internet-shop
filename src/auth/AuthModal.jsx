import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Create from "./Create";
import Login from "./Login";
import Code from "./Code";

export default function AuthModal({
  // agar siz header ichida state bilan ishlashni davom ettirmoqchi bo'lsangiz
  // bu componentni shu kod bilan App ga ko'chiring. Men context ichida isAuthOpen orqali boshqaraman.
}) {
  const {
    isAuthOpen,
    closeAuth,
    login, // agar Login/Create ichida login chaqirilsa
  } = useContext(AuthContext);

  // local state for modal nav
  const [current, setCurrent] = React.useState("create");
  const [backBtn, setBackBtn] = React.useState(false);
  const [title, setTitle] = React.useState("Create account");
  const [phone, setPhone] = React.useState("");
  const [fullName, setFullName] = React.useState("");

  if (!isAuthOpen) return null;

  return (
    <div className={isAuthOpen ? "auth__outer" : "auth__dis"}>
      <div className="auth" onClick={() => { closeAuth(); }}>
        <div className="auth__wrap" onClick={(e) => { e.stopPropagation(); }}>
          <div className="auth__desc">
            <p className='auth__desc-text'>
              {backBtn ? (<img onClick={()=>{ setCurrent('create'); setBackBtn(false); }} className='auth__desc-text__back' src={'/icons/left.svg'} alt="back" />) : null}
              {title}
            </p>
            <img src={'/icons/close.svg'} onClick={() => { closeAuth(); }} alt="close" />
          </div>
          <div className="auth__child">
            {
              current === 'create' ? (
                <Create title={setTitle} setCurrent={setCurrent} setBack={setBackBtn} phone={phone} setPhone={setPhone}
                  setFullName={setFullName} />
              ) : current === 'login' ? (
                <Login title={setTitle} setCurrent={setCurrent} setBack={setBackBtn} phone={phone} setPhone={setPhone}/>
              ) : current === 'code' ? (
                <Code title={setTitle} setCurrent={setCurrent} setBack={setBackBtn} phone={phone} fullName={fullName}/>
              ) : null
            }
          </div>
        </div>
      </div>
    </div>
  );
}