import React from "react";
import style from "./NavBar.module.css";
import logo from "../../assets/fav.ico";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/searchBar";

const NavBar = () => {
  return (
    <div className={style.navContainer}>
      <Link to="/home">
        <img className={style.logo} src={logo} alt="" />
      </Link>
      <SearchBar />
      <div>
        <Link to="/create" className={style.createPokemon}>
          CREATE POKEMON
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
