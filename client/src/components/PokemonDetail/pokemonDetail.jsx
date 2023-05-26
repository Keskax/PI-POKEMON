import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { pokemonDetail, cleanDetail } from "../../Redux/action/action";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deletePokemon } from "../../Redux/action/action";
import { useHistory } from "react-router-dom";
import styles from "./styles.css";
import logo from "../../assets/PokeLoading.gif";

const PokemonDetails = ({ details }) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(pokemonDetail(id));
    return () => dispatch(cleanDetail());
  }, [id, dispatch]);

  //* condición en el que muestra un detalle en carga
  if (!details.length) {
    return <img className={`logo ${styles.logo}`} src={logo} alt="" />;
  }
  let { name, image, hp, attack, defense, speed, height, weight, type, Types } =
    details[0];

  type = type ? type : Types;
  type = type.map((tp) => {
    if (typeof tp === "string") return tp;
    return tp.name;
  });

  function handleDeletePokemon(id) {
    dispatch(deletePokemon(id));

    history.push("/home");
  }

  return (
    <div>
      <main className="container main pokemon">
        <div className="header-main-pokemon">
          <span className="number-pokemon">#{id}</span>
          <div className="container-info-pokemon">
            <h1 className="name">{name}</h1>
            <button
              className="close-button"
              type="button"
              onClick={() => handleDeletePokemon(id)}
            >
              X
            </button>

            <div className="info-pokemon">
              <div className="group-info">
                <p>Height</p>
                <span>{height} Cm</span>
                <p>Weight</p>
                <span>{weight} Gr</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container-img-pokemon">
          <img src={image} alt={name} />
        </div>
        <div className="card-types">
          <div className="card-types">{type?.join(", ")}</div>
        </div>

        <div className="container-stats">
          <h1>Stats</h1>
          <div className="stats">
            <div className="stat-group">
              <span>Hp</span>
              <div className="progress-bar" style={{ width: `${hp}%` }}></div>
              <span className="counter-stats">{hp}</span>
            </div>

            <div className="stat-group">
              <span>Attack</span>
              <div
                className="progress-bar"
                style={{ width: `${attack}%` }}
              ></div>
              <span className="counter-stats">{attack}</span>
            </div>

            <div className="stat-group">
              <span>Defense</span>
              <div
                className="progress-bar"
                style={{ width: `${defense}%` }}
              ></div>
              <span className="counter-stats">{defense}</span>
            </div>

            <div className="stat-group">
              <span>Speed</span>
              <div
                className="progress-bar"
                style={{ width: `${speed}%` }}
              ></div>
              <span className="counter-stats">{speed}</span>
            </div>
          </div>
        </div>
      </main>
      <div>
        <button className="bar">
          <Link to="/home" className="bar">
            Home
          </Link>
        </button>
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    details: state.Details,
  };
}

export default connect(mapStateToProps, null)(PokemonDetails);
