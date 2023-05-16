import React from "react";
import style from "./paginado.module.css";

export default function Paginado({
  pokemonsPerPage,
  allPokemons,
  paginado,
  currentPage,
  pagePrev,
  pageNext,
}) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav>
      <div className={style.paginationCenter}>
        <div className={style.number} onClick={pagePrev}>
          «
        </div>
        {pageNumber.map((number) => (
          <div
            className={currentPage === number ? style.pageAll : style.number}
            key={number}
            onClick={() => paginado(number)}
          >
            {number}
          </div>
        ))}
        <div className={style.number} onClick={pageNext}>
          »
        </div>
      </div>
    </nav>
  );
}
