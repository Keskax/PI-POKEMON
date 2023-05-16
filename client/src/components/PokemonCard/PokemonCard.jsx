import React from "react";
import style from "./PokemonCard.module.css";
// import { Link } from "react-router-dom";

export default function pokemonCard({ name, image, type }) {
  return (
    <div className={style.card}>
      {/* <Link to={`/${id}`}> */}
      <img className={style.imagen} src={image} />
      <h4 className={style.name}>{name}</h4>
      <div>
        <div>
          {type.map((type) => (
            <a className={style.contenido}> {type} </a>
          ))}
        </div>
      </div>
      {/* </Link> */}
    </div>
  );
}
