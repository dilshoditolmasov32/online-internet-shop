import { useState } from "react";
import time from "../../assets/img/time.svg";
import "../../styles/scss/components/search.scss";

export default function Search() {
  const [hist, setHist] = useState(["sdd", "dssd", "sdsd"]);
  return (
    <div className="search">
      <div className="container">
        {hist.length > 0 ? (
          <div className="search__wrap">
            <div className="search__top">
              <p className="search__top-title">Yaqinda qidirilganlar</p>
              <button
                className="search__top-text"
                onClick={() => {
                  setHist([]);
                }}
              >
                Tozalash
              </button>
            </div>
            <div className="search__history">
              {hist.map((e, i) => (
                <p key={i} className="search__history-text">
                  <img src={img} alt="historyIcon" />
                  {e}
                </p>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
