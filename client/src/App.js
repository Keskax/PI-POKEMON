import "./App.css";
import { Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar/navBar";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/home";
import createPokemon from "./components/CreatePokemon/createPokemon";

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
        <Route path="/create" element={createPokemon} />
      </Switch>
    </div>
  );
}

export default App;
