import React from "react";

function Button({ click }) {
  return (
    <div className="filter-footer p flex flex_a-c">
      <button onClick={click} className="button-save js-button">
        Сохранить
      </button>
    </div>
  );
}

export default Button;
