import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import LinearRegression from './laboratories/linearRegression/LinearRegression';
import TensorFlow from './laboratories/linearRegression/TensorFlow';
import $$ from 'whi18n';

const Labs = props => {
	return (
		<section className="Labs">
			<div className="laboratories">
				<div className="lab-navs">
					<NavLink to="/labs/tensorflow">Tensor Flow</NavLink>
					<NavLink to="/labs/linear-regression">Linear Regression</NavLink>
				</div>
			</div>
			<div className="laboratory">
				<Switch>
					<Route path="/labs/tensorflow" component={TensorFlow} />
					<Route path="/labs/linear-regression" component={LinearRegression} />
					<Redirect to="/labs/linear-regression" />
				</Switch>
			</div>
		</section>
	);
};

export default Labs;
