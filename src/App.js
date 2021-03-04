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
import Idioms from './projects/idioms/Idioms';

const App = () => {
	useMaxHeight();
	return (
		<Router>
			<div className="App">
				<nav>
					<NavLink exact to="/" className="logo pc-only"></NavLink>
					<div className="nav-links">
						<NavLink exact to="/" title={$$`home`}><i className="icon-home"></i></NavLink>
						<NavLink to="/forum" title={$$`forum`}><i className="icon-forum"></i></NavLink>
						<NavLink to="/hexie" title={$$`hexie-encoder`}><i className="icon-exchange"></i></NavLink>
						<NavLink to="/idioms" title={$$`idioms`}><i className="icon-book"></i></NavLink>
					</div>
					<LanguageSwitcher />
					<User />
				</nav>
				<main>
					<Switch>
						<Route path="/hexie" component={HexieEncoder} />
						<Route path="/forum" component={Forum} />
						<Route path="/idioms" component={Idioms} />
						<Route path="/" component={Home} exact />
					</Switch>
				</main>
				<footer>
					&copy;&nbsp;<a href="https://github.com/wheatup/" target="_blank" rel="noopener noreferrer">wheatup</a>&nbsp;<a target="_blank" href="https://github.com/wheatup/wheatup.github.io/blob/master/LICENSE">@{new Date().getFullYear()} {$$`all-rights-reserved`}</a>
				</footer>
			</div>
		</Router>
	);
}

export default App;
