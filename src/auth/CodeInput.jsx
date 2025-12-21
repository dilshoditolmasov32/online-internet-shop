import React, { useRef } from "react";

export default function CodeInput({ length = 6, code, setCode }) {
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Разрешаем только цифры или пустую строку

    const newCode = [...code];
    newCode[index] = value;

    setCode(newCode);

    // Переключение на следующий инпут
    if (value && index < length - 1) {
      const next = inputsRef.current[index + 1];
      if (next) next.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (code[index]) {
        // очищаем текущую ячейку
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
        return;
      }
      if (index > 0) {
        const prev = inputsRef.current[index - 1];
        if (prev) prev.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={code[index] || ""}
          maxLength={1}
          className="code__input"
          onChange={(e) => handleChange(index, e.target.value.replace(/\D/g, ""))}
          onKeyDown={(e) => handleKeyDown(index, e)}
        />
      ))}
    </>
  );
}