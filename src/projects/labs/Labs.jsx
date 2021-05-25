import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
// import LinearRegression from './laboratories/linearRegression/LinearRegression';
// import TensorFlow from './laboratories/linearRegression/TensorFlow';
import Idioms from './laboratories/idioms/Idioms';
import HexieEncoder from './laboratories/hexie/HexieEncoder';
import WebColorPicker from './laboratories/web-color-picker/WebColorPicker';
import RegexDictionary from './laboratories/regex-dictionary/RegexDictionary';
import $$ from 'whi18n';

const Labs = props => {
	return (
		<section className="Labs">
			<div className="laboratories">
				<div className="lab-navs">
					{/* <NavLink to="/labs/tensorflow">Tensor Flow</NavLink> */}
					{/* <NavLink to="/labs/linear-regression">Linear Regression</NavLink> */}
					<NavLink to="/labs/hexie">{$$`hexie-encoder`}</NavLink>
					<NavLink to="/labs/idioms">{$$`idioms`}</NavLink>
					<NavLink to="/labs/web-color-picker">{$$`web-color-picker`}</NavLink>
					<NavLink to="/labs/regex-dictionary">{$$`regex-dictionary`}</NavLink>
				</div>
			</div>
			<div className="laboratory">
				<Switch>
					{/* <Route path="/labs/tensorflow" component={TensorFlow} /> */}
					{/* <Route path="/labs/linear-regression" component={LinearRegression} /> */}
					<Route path="/labs/hexie" component={HexieEncoder} />
					<Route path="/labs/idioms" component={Idioms} />
					<Route path="/labs/web-color-picker" component={WebColorPicker} />
					<Route path="/labs/regex-dictionary" component={RegexDictionary} />
					<Redirect to="/labs/idioms" />
				</Switch>
			</div>
		</section>
	);
};

export default Labs;
