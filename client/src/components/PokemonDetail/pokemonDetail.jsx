import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pokemonDetail } from "../../Redux/action/action";
import { useParams } from "react-router-dom";

export default function PokemonDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(pokemonDetail(id));
  }, [dispatch, id]);

  const myPokemon = useSelector((state) => state.PokemonDetails);

  return (
    <div>
      {Object.keys(myPokemon).length > 0 ? (
        <div>
          <h1>Id: {myPokemon.id}</h1>
          <h1>Hp: {myPokemon.name}</h1>
          <h1>Attack: {myPokemon.attack}</h1>
          <h1>Defense: {myPokemon.defense}</h1>
          <h1>Speed: {myPokemon?.speed}</h1>
          <h1>Height: {myPokemon?.height}</h1>
          <h1>Weight: {myPokemon?.weight}</h1>
          <h1>image: {myPokemon.image}</h1>
          <h1>
            Types:{" "}
            {!myPokemon.createdInDb
              ? myPokemon.type + " "
              : myPokemon.Types.map((ty) => ty.name + " ")}
          </h1>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
