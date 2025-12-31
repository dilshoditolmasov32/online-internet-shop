import { useRef } from "react";

export default function CodeInput({ length = 6, code, setCode }) {
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    const val = value.replace(/\D/g, "");
    if (!val && value !== "") return;

    const newCode = [...code];
    newCode[index] = val.slice(-1);
    setCode(newCode);

    if (val && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

const handlePaste = (e) => {
  e.preventDefault();
  const pasteData = e.clipboardData.getData("text"); 
  const pasteValues = pasteData.split("").filter(char => /\d/.test(char)); 
};
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!code[index] && index > 0) {
        const newCode = [...code];
        newCode[index - 1] = ""; 
        setCode(newCode);
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  return (
    <div className="code__inputs-row" style={{ display: 'flex', gap: '8px' }}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          inputMode="numeric"
          value={code[index] || ""}
          maxLength={1}
          className="code__input-box"
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste} 
        />
      ))}
    </div>
  );
}