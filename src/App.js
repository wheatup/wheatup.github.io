import React from 'react';
import HexieEncoder from './projects/hexie/HexieEncoder';
import {
	HashRouter as Router,
	Switch,
	Route,
	NavLink
} from "react-router-dom";
import Home from './projects/home/Home';
import { useMaxHeight } from './hooks/misc';
import Forum from './projects/forum/components/Forum';
import User from './components/common/User';
import LanguageSwitcher from './components/LanguageSwitcher';
import $$ from 'whi18n';

const App = () => {
	useMaxHeight();
	return (
		<Router>
			<div className="App">
				<nav>
					<NavLink exact to="/" className="logo pc-only"></NavLink>
					<div className="nav-links">
						<NavLink exact to="/">{$$`home`}</NavLink>
						<NavLink to="/forum">{$$`forum`}</NavLink>
						<NavLink to="/hexie">{$$`hexie-encoder`}</NavLink>
					</div>
					<LanguageSwitcher />
					<User />
				</nav>
				<main>
					<Switch>
						<Route path="/hexie" component={HexieEncoder} />
						<Route path="/forum" component={Forum} />
						<Route path="/" component={Home} exact />
					</Switch>
				</main>
				<footer>
					&copy;&nbsp;<a href="https://github.com/wheatup/" target="_blank" rel="noopener noreferrer">wheatup</a>&nbsp;@{new Date().getFullYear()} {$$`all-rights-reserved`}
				</footer>
			</div>
		</Router>
	);
}

export default App;
