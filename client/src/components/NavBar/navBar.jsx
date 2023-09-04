import React from "react";
import style from "./NavBar.module.css";
import logo from "../../assets/fav.ico";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/searchBar";
import { getAllPokemon } from "../../Redux/action/action";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const dispatch = useDispatch();

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(getAllPokemon());
  };
  return (
    <div className={style.navContainer}>
      <Link to="/home">
        <img onClick={handleClick} className={style.logo} src={logo} alt="" />
      </Link>
      <SearchBar />
      <div>
        <Link to="/create" className={style.createPokemon}>
          Create Pokemon
        </Link>
      </div>
    </div>
  );
};
export default NavBar;
