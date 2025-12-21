import { useState } from "react";
import "../../styles/scss/vendors/cityDrop.scss";
import galka from "../../assets/img/galka.svg";

const Dropbox = ({ array, selected, curr }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (option) => {
    setSelectedOption(option);
    selected();
    setIsOpen(false);
    selected(option);
  };

  return (
    <div className="citydrop">
      <div
        onClick={() => {
          toggleDropdown();
        }}
        className="citydrop-button"
        style={{
          color: selectedOption ? "#000" : "#7D7D7D",
        }}
      >
          {selectedOption || "Shaharni tanlang"}
      </div>

      {isOpen ? (
        <div className="citydrop-list">
          {array.map((e, i) => (
            <div
              key={i}
              onClick={() => {
                handleSelect(e);
              }}
              className="citydrop-list__element"
            >
              {e}
              {e == curr ? <img src={galka} alt="icon"></img> : ""}
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Dropbox;
