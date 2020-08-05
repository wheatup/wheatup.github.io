import React from 'react';
import HexieEncoder from './components/projects/hexie/HexieEncoder';
import {
	HashRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import Home from './components/projects/home/Home';

const App = () => {
	return (
		<Router>
			<div className="App">
				<nav>
					<Link to="/" className="logo"></Link>
					<Link to="/">首页</Link>
					<Link to="/hexie">和谐加密器</Link>
				</nav>
				<main>
					<Switch>
						<Route path="/hexie">
							<HexieEncoder />
						</Route>
						<Route path="/" exact>
							<Home />
						</Route>
					</Switch>
				</main>
				<footer>
					&copy;&nbsp;<a href="https://github.com/wheatup/" target="_blank">wheatup</a>&nbsp;@{new Date().getFullYear()} All rights reserved.
				</footer>
			</div>
		</Router>
	);
}

export default App;
