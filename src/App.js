import React, { useCallback, useEffect, useMemo } from 'react';
import {
	BrowserRouter as Router,
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
import { setData, useData } from 'wherehouse';
import { CV as ViewCV, FULLSCREEN, IS_CV, LANG } from './utils/store';
import CV from './projects/cv/CV';
import GlobalRouteHandler from './components/GlobalRouteHandler';
import Button from './components/common/Button';
// import html2canvas from 'html2canvas';

const App = () => {
	useMaxHeight();
	const cv = useData(ViewCV);
	const isCV = useData(IS_CV);
	const fullscreen = useData(FULLSCREEN);
	useEffect(() => {
		const search = new URLSearchParams(window.location.search);
		if (search.get('lang')) {
			const lang = search.get('lang');
			window.localStorage.setItem('lang', lang);
			search.delete('lang');
			if (!search.get('redirect')) {
				const url = window.location.href.replace(/lang=[\w-]+&?/g, '').replace(/\?$/g, '');
				window.location.href = url;
			}
		}
		if (search.get('redirect')) {
			let url = `/${search.get('redirect')}`;
			if ([...search.entries()].length > 1) {
				url += `?${[...search.entries()].filter(([key]) => ['redirect', 'lang'].includes(key)).map(e => e.join('=')).join('&')}`;
			}
			window.location.href = url;
		}
	}, []);

	// const onClickDownloadAsPDF = useCallback(() => {
	// 	html2canvas(document.querySelector('.CV'), {
	// 		windowWidth: 3508,
	// 		windowHeight: 2480
	// 	}).then(function (canvas) {
	// 		var a = document.createElement('a');
	// 		// toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
	// 		a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
	// 		a.download = 'CV_HAOWU.jpg';
	// 		a.click();
	// 		a.remove();
	// 	});
	// }, []);

	return (
		<Router path={process.env.PUBLIC_URL + '/'}>
			<div className="App">
				{!fullscreen &&
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
							{/* {isCV && <a target="_blank" href="/data/CV_HAOWU.pdf" download><i className="icon-arrow-down" style={{fontSize: '2rem'}}></i><span style={{marginLeft: '0.5rem'}} className="pc-only">{$$`download`}</span></a>} */}
							{/* {isCV && <Button onClick={onClickDownloadAsPDF}>{$$`download`}</Button>} */}
							<LanguageSwitcher />
							<User />
						</div>
					</nav>
				}
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
					<Switch>
						<Route component={GlobalRouteHandler} />
					</Switch>
				</main>
				{!fullscreen &&
					<footer>
						&copy;&nbsp;<a href="https://github.com/wheatup/" target="_blank" rel="noopener noreferrer">wheatup</a>&nbsp;<a target="_blank" href="https://github.com/wheatup/wheatup.github.io/blob/master/LICENSE">@{new Date().getFullYear()} {$$`all-rights-reserved`}</a>
					</footer>
				}
				<ToastContainer hideProgressBar closeOnClick autoClose={3000} />
			</div>
		</Router>
	);
}

export default App;
