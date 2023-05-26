import React from "react";
import style from "./PokemonCard.module.css";
import pokePerType from "../pokePerType/pokePerType";

export default function PokemonCard({ name, image, type }) {
  if (!Array.isArray(type)) {
    type = [type];
  }

  type = type.map((tp) => {
    if (typeof tp === "string") return tp;
    return tp?.name;
  });

  return (
    <div className={style.card}>
      <img className={style.imagen} src={image} alt={name} />
      <h4 className={style.name}>{name}</h4>

      <div>
        {type?.map((type, index) => (
          <a
            key={index}
            style={{ backgroundColor: pokePerType(type) }}
            className={style.contenido}
          >
            {type}
          </a>
        ))}
      </div>
    </div>
  );
}
