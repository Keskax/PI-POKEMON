import "./App.css";
import { Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar/navBar";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/home";
import CreateNewPokemon from "./components/CreatePokemon/createPokemon";
import PokemonDetails from "./components/PokemonDetail/pokemonDetail";
import axios from "axios";
axios.defaults.baseURL = "https://pi-pokemon-production-7e3d.up.railway.app/";
// axios.defaults.baseURL = "http://localhost:3001/";
function App() {
  return (
    <div className="App">
      <Route
        path="/"
        render={({ location }) => {
          if (location.pathname !== "/") {
            return <NavBar />;
          }
        }}
      />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/create" component={CreateNewPokemon} />
        <Route path="/detail/:id" component={PokemonDetails} />
      </Switch>
    </div>
  );
}

export default App;
