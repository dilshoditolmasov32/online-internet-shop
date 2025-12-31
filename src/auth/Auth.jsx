import { IoClose } from "react-icons/io5";
import { useContext, useState, useEffect } from "react";
import Username from "../components/inputs/Username";
import { AuthContext } from "./context/AuthContext";
import Create from "./Create";
import Login from "./Login";
import Code from "./Code";
import left from "../assets/img/left.svg";


export default function Auth() {
  const { isAuthOpen, closeAuth, login } = useContext(AuthContext);

  const [current, setCurrent] = useState("create");
  const [backBtn, setBackBtn] = useState(false);
  const [title, setTitle] = useState("Telefon raqamingizni kiriting");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    if (isAuthOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
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
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeAuth();
              }}
              className="close-btn"
              type="button"
            >
              <IoClose size={30} color="black" />
            </button>
          </div>

          <div className="auth__child">
            {current === "create" ? (
              <>
                <Username fullName={fullName} setFullName={setFullName} />
                <Create
                  title={setTitle}
                  setCurrent={setCurrent}
                  setBack={setBackBtn}
                  phone={phone}
                  setPhone={setPhone}
                  setFullName={setFullName}
                  login={login}
                  fullName={fullName}
                />
              </>
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
