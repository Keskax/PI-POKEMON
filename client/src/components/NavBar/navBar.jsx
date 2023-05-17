import React from "react";
import style from "./NavBar.module.css";
import logo from "../../assets/fav.ico";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className={style.navContainer}>
      <Link to="/home">
        <img className={style.logo} src={logo} alt="" />
      </Link>
      <div className={style.createPokemon}>
        <Link to="/create" className={style.link}>
          CREATE POKEMON
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
