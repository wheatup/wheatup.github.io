import React from 'react';
import HexieEncoder from './components/HexieEncoder';
import {
	HashRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

const App = () => {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route path="/hexie">
						<HexieEncoder />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
