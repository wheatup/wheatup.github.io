import React from 'react';
import HexieEncoder from './projects/hexie/HexieEncoder';
import {
	HashRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import Home from './projects/home/Home';
import { useMaxHeight } from './hooks/misc';

const App = () => {

	useMaxHeight();

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
						<Route path="/hexie" component={HexieEncoder} />
						<Route path="/" component={Home} exact />
					</Switch>
				</main>
				<footer>
					&copy;&nbsp;<a href="https://github.com/wheatup/" target="_blank" rel="noopener noreferrer">wheatup</a>&nbsp;@{new Date().getFullYear()} All rights reserved.
				</footer>
			</div>
		</Router>
	);
}

export default App;
