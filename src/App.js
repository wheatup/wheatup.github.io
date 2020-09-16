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
import Moyu from './projects/moyu/Moyu';
import { setup } from './utils/store';

setup();

const App = () => {

	useMaxHeight();

	return (
		<Router>
			<div className="App">
				<nav>
					<NavLink exact to="/" className="logo"></NavLink>
					<NavLink exact to="/">首页</NavLink>
					<NavLink to="/forum">留言板</NavLink>
					<NavLink to="/hexie">和谐加密器</NavLink>
					<NavLink to="/moyu">摸鱼</NavLink>
					<User />
				</nav>
				<main>
					<Switch>
						<Route path="/hexie" component={HexieEncoder} />
						<Route path="/forum" component={Forum} />
						<Route path="/moyu" component={Moyu} />
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
