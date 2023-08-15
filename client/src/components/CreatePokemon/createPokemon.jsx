import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { createPokemon, getAllTypes } from "../../Redux/action/action";
import { useDispatch, useSelector } from "react-redux";
import validateForm from "../validation/validation";
import "./create.style.css";

export default function CreateNewPokemon() {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.Types);

  const [currentPage, setCurrentPage] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
    type: [],
  });

  //* fn que permite darle valores a los input
  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validateForm({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  }

  //* fn que muestra y selecciona los types
  function handleSelect(event) {
    setInput({
      ...input,
      type: [...input.type, event.target.value],
    });
  }

  //*fn que hace que se ejecute el botón de crear
  function handleSubmit(event) {
    event.preventDefault();
    setCurrentPage(1);
    dispatch(createPokemon(input));
    alert("pokemon successfully created");
    setInput({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      image: "",
      type: [],
    });
    history.push("/home");
  }

  // // //*
  // const disable = () => {
  //   if (Object.keys(errors).length) return true;
  //   return false;
  // };

  // // //*

  useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);
  return (
    <div>
      <div className="create-pokemon">
        <h1>CREATE POKEMON</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div>
            <label>Attack:</label>
            <input
              type="number"
              value={input.attack}
              name="attack"
              onChange={handleChange}
            />
            {errors.attack && <p className="error">{errors.attack}</p>}

            <div>
              <label>Hp:</label>
              <input
                type="number"
                value={input.hp}
                name="hp"
                onChange={handleChange}
              />
            </div>
            {errors.hp && <p className="error">{errors.hp}</p>}
          </div>
          <div>
            <label>Defense:</label>
            <input
              type="number"
              value={input.defense}
              name="defense"
              onChange={handleChange}
            />
            {errors.defense && <p className="error">{errors.defense}</p>}
          </div>
          <div>
            <label>Speed:</label>
            <input
              type="number"
              value={input.speed}
              name="speed"
              onChange={handleChange}
            />
            {errors.speed && <p className="error">{errors.speed}</p>}
          </div>
          <div>
            <label>Height:</label>
            <input
              type="number"
              value={input.height}
              name="height"
              onChange={handleChange}
            />
            {errors.height && <p className="error">{errors.height}</p>}
          </div>
          <div>
            <label>Weight:</label>
            <input
              type="number"
              value={input.weight}
              name="weight"
              onChange={handleChange}
            />
            {errors.weight && <p className="error">{errors.weight}</p>}
          </div>
          <div>
            <label>Image:</label>
            <input
              type="text"
              value={input.image}
              name="image"
              onChange={handleChange}
            />
            {errors.image && <p className="error">{errors.image}</p>}
          </div>
          <div>
            <select onChange={handleSelect}>
              <label>Types:</label>
              {types.map((type) => (
                <option value={type.name}>{type.name}</option>
              ))}
            </select>
            <ul>
              <il>{input.type.map((ty) => ty + " ,")}</il>
            </ul>
            {errors.type && <p className="error">{errors.type}</p>}
          </div>

          <button
            disabled={
              Object.values(input).some((value) => value === "") ||
              (input.type && input.type.length === 0)
            }
            type="submit"
          >
            CREATE
          </button>
        </form>
      </div>
    </div>
  );
}
