import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import LinearRegression from './laboratories/linearRegression/LinearRegression';
import TensorFlow from './laboratories/linearRegression/TensorFlow';
import Idioms from './laboratories/idioms/Idioms';
import HexieEncoder from './laboratories/hexie/HexieEncoder';
import $$ from 'whi18n';

const Labs = props => {
	return (
		<section className="Labs">
			<div className="laboratories">
				<div className="lab-navs">
					{/* <NavLink to="/labs/tensorflow">Tensor Flow</NavLink> */}
					<NavLink to="/labs/hexie">{$$`hexie-encoder`}</NavLink>
					<NavLink to="/labs/idioms">{$$`idioms`}</NavLink>
					<NavLink to="/labs/linear-regression">Linear Regression</NavLink>
				</div>
			</div>
			<div className="laboratory">
				<Switch>
					<Route path="/labs/tensorflow" component={TensorFlow} />
					<Route path="/labs/hexie" component={HexieEncoder} />
					<Route path="/labs/idioms" component={Idioms} />
					<Route path="/labs/linear-regression" component={LinearRegression} />
					<Redirect to="/labs/linear-regression" />
				</Switch>
			</div>
		</section>
	);
};

export default Labs;
