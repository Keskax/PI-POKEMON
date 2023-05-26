import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemon } from "../../Redux/action/action";
import style from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getNamePokemon(name));
    setName(""); // Limpiar el valor del input
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <div className={style.bar}>
      <input
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // valor para poder buscar con la tecla enter
        type="text"
        placeholder="Search..."
        value={name} // Asignar el valor del estado al input
      />
      <button type="submit" onClick={handleSubmit}>
        Search
      </button>
    </div>
  );
}
