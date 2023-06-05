import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPokemon,
  getAllTypes,
  filterPokemonsByTypes,
  orderPokemonsByAttack,
  orderPokemonsByName,
  filterCreated,
} from "../../Redux/action/action";
import style from "./Home.module.css";
import { Link } from "react-router-dom";
import PokemonCard from "../PokemonCard/PokemonCard";
import Paginado from "../Paginado/paginado";
import HomeLoading from "../../assets/HomeLoading.gif";

//!Trae y muestra los pokemons en Home
export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.Pokemons);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllPokemon()).then(() => {
      setIsLoading(false);
    });
    dispatch(getAllTypes());
  }, []);

  //!Paginado

  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
  const lastPokemon = currentPage * pokemonsPerPage;
  const firstPokemon = lastPokemon - pokemonsPerPage;

  const currentPokemon = allPokemons.slice(firstPokemon, lastPokemon);

  //! constante que renderiza los números de pag
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function pagePrev() {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

  function pageNext() {
    let lastPage = Math.ceil(allPokemons.length / pokemonsPerPage);
    if (currentPage < lastPage) setCurrentPage(currentPage + 1);
  }

  //! fn que filtra los types en el home

  const types = useSelector((state) => state.Types);

  function handleFilterTypes(event) {
    dispatch(filterPokemonsByTypes(event.target.value));
  }

  //!


  //*
  useEffect(() => {
    setCurrentPage(1);
  }, [allPokemons]);
  //*

  const [order, setOrder] = useState("");

  function handlerOrderByAttack(event) {
    dispatch(orderPokemonsByAttack(event.target.value));
    setCurrentPage(1);
    setOrder(event.target.value);
  }

  function handlerOrderByName(event) {
    dispatch(orderPokemonsByName(event.target.value));
    setCurrentPage(1);
    setOrder(event.target.value);
  }

  function handleFilterCreated(event) {
    event.preventDefault();
    dispatch(filterCreated(event.target.value));
    setCurrentPage(1);
  }

  return (
    <div>
      {isLoading ? (
        <img
          className={`logo ${style.HomeLoading}`}
          src={HomeLoading}
          alt="Loading"
        />
      ) : (
        <div>
          <span className={style.filter}>Sort by:</span>
          <select
            onChange={(event) => handlerOrderByName(event)}
            className={style.content}
          >
            <option disabled selected defaultValue>
              Alphabetical
            </option>
            <option value="ASC">Ascending </option>
            <option value="DES">Descending</option>
          </select>

          <select
            onChange={(event) => handlerOrderByAttack(event)}
            className={style.content}
          >
            <option disabled selected defaultValue>
              Attack
            </option>
            <option value="LOW">Lowest Attack </option>
            <option value="HIG">Higher Attack</option>
          </select>

          <span className={style.filter}>Filter by:</span>
          <select onChange={handleFilterTypes} className={style.content}>
            <option disabled selected defaultValue>
              Types
            </option>
            <option value="All">All</option>
            {types?.map((tp, index) => (
              <option key={index} value={tp.name}>
                {tp.name}
              </option>
            ))}
          </select>

          <select
            onChange={(event) => handleFilterCreated(event)}
            className={style.content}
          >
            <option disabled selected defaultValue>
              Existing and Created
            </option>
            <option value="All">All</option>
            <option value="CREATED">Created</option>
            <option value="API">Existing</option>
          </select>

          <div className={style.container}>
            {currentPokemon?.map((poke) => {
              return (
                <Link to={"/detail/" + poke.id} className={style.link}>
                  <PokemonCard
                    id={poke.id}
                    name={poke.name}
                    image={poke.image}
                    type={poke.type ? poke.type : poke.Types}
                  />
                </Link>
              );
            })}
          </div>
          <Paginado
            currentPage={currentPage}
            pokemonsPerPage={pokemonsPerPage}
            allPokemons={allPokemons.length}
            paginado={paginado}
            pagePrev={pagePrev}
            pageNext={pageNext}
          />
        </div>
      )}
    </div>
  );
}
