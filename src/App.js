import React from 'react';
import {
	HashRouter as Router,
	Switch,
	Route,
	NavLink,
	Redirect
} from "react-router-dom";
import Home from './projects/home/Home';
import { useMaxHeight } from './hooks/misc';
import Forum from './projects/forum/components/Forum';
import User from './components/common/User';
import LanguageSwitcher from './components/LanguageSwitcher';
import $$ from 'whi18n';
import Labs from './projects/labs/Labs';
import Games from './projects/games/Games';
import Blog from './projects/blog/components/Blog';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useData } from 'wherehouse';
import { CV as ViewCV } from './utils/store';
import CV from './projects/cv/CV';

const App = () => {
	useMaxHeight();
	const cv = useData(ViewCV);
	return (
		<Router>
			<div className="App">
				<nav>
					<div className="nav">
						<NavLink exact to="/" className="logo pc-only"></NavLink>
						<div className="nav-links">
							<NavLink exact to="/" title={$$`home`}><i className="icon-home"></i></NavLink>
							<NavLink to="/blog" title={$$`blog`}><i className="icon-pencil"></i></NavLink>
							<NavLink to="/forum" title={$$`forum`}><i className="icon-forum"></i></NavLink>
							<NavLink to="/labs" title={$$`labs`}><i className="icon-lab"></i></NavLink>
							{cv && <NavLink to="/cv" title={$$`cv`}><i className="icon-profile"></i></NavLink>}
							{/* <NavLink to="/games" title={$$`games`}><i className="icon-pacman"></i></NavLink> */}
						</div>
						<LanguageSwitcher />
						<User />
					</div>
				</nav>
				<main>
					<Switch>
						<Route path="/forum" component={Forum} />
						<Route path="/blog" component={Blog} />
						<Redirect path="/hexie" to="/labs/hexie" />
						<Redirect path="/idioms" to="/labs/idioms" />
						<Route path="/labs" component={Labs} />
						<Route path="/games" component={Games} />
						<Route path="/cv" component={CV} />
						<Route path="/" component={Home} exact />
					</Switch>
				</main>
				<footer>
					&copy;&nbsp;<a href="https://github.com/wheatup/" target="_blank" rel="noopener noreferrer">wheatup</a>&nbsp;<a target="_blank" href="https://github.com/wheatup/wheatup.github.io/blob/master/LICENSE">@{new Date().getFullYear()} {$$`all-rights-reserved`}</a>
				</footer>
				<ToastContainer hideProgressBar closeOnClick autoClose={3000}/>
			</div>
		</Router>
	);
}

export default App;
