import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Pokedex from "./Pokedex";
import Pokemon from "./Pokemon";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/' render={(props) => <Pokedex {...props} />} />
				<Route exact path='/:pokemonId' render={(props) => <Pokemon {...props} />} />
			</Switch>
		</Router>
	);
}

export default App;
