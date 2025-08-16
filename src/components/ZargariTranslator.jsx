import React, { useState } from "react";

function ZargariTranslator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("toZargari"); // حالت ترجمه

  // تبدیل به زرگری
  const toZargari = (text) => {
    return text.replace(/([اآایویuoea])/g, "$1ز$1");
  };

  // برگرداندن به حالت عادی
  const fromZargari = (text) => {
    return text.replace(/([اآایویuoea])ز\1/g, "$1");
  };

  const handleTranslate = () => {
    if (mode === "toZargari") {
      setOutput(toZargari(input));
    } else {
      setOutput(fromZargari(input));
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>مترجم زبان زرگری</h2>

      <select value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="toZargari">عادی ➡ زرگری</option>
        <option value="fromZargari">زرگری ➡ عادی</option>
      </select>

      <textarea
        rows="4"
        placeholder="متن خود را وارد کنید..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "100%", marginTop: "10px" }}
      ></textarea>

      <button onClick={handleTranslate} style={{ marginTop: "10px" }}>
        ترجمه کن
      </button>

      <textarea
        rows="4"
        readOnly
        value={output}
        style={{ width: "100%", marginTop: "10px", background: "#f3f3f3" }}
      ></textarea>
    </div>
  );
}

export default ZargariTranslator;
