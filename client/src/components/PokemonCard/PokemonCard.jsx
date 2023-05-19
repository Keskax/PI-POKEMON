import React from "react";
import style from "./PokemonCard.module.css";
import { Link } from "react-router-dom";
import pokePerType from "../pokePerType/pokePerType";

export default function PokemonCard({ name, image, type, id }) {
  return (
    <div className={style.card}>
      <Link to={`/detail/${id}`}>
        <img className={style.imagen} src={image} alt={name} />
        <h4 className={style.name}>{name}</h4>
        <div>
          {type.map((type) => (
            <a
              key={type}
              style={{ backgroundColor: pokePerType(type) }}
              className={style.contenido}
            >
              {type}
            </a>
          ))}
        </div>
      </Link>
    </div>
  );
}
