import React from 'react';
import { Route, Routes, NavLink, Navigate } from 'react-router-dom';
// import LinearRegression from './laboratories/linearRegression/LinearRegression';
// import TensorFlow from './laboratories/linearRegression/TensorFlow';
import Idioms from './laboratories/idioms/Idioms';
import HexieEncoder from './laboratories/hexie/HexieEncoder';
import WebColorPicker from './laboratories/web-color-picker/WebColorPicker';
import RegexDictionary from './laboratories/regex-dictionary/RegexDictionary';
import $ from 'whi18n';

const Labs = () => {
	return (
		<section className="Labs">
			<div className="laboratories">
				<div className="lab-navs">
					{/* <NavLink to="/labs/tensorflow">Tensor Flow</NavLink> */}
					{/* <NavLink to="/labs/linear-regression">Linear Regression</NavLink> */}
					<NavLink to="/labs/hexie">{$`hexie-encoder`}</NavLink>
					<NavLink to="/labs/idioms">{$`idioms`}</NavLink>
					<NavLink to="/labs/web-color-picker">{$`web-color-picker`}</NavLink>
					<NavLink to="/labs/regex-dictionary">{$`regex-dictionary`}</NavLink>
				</div>
			</div>
			<div className="laboratory">
				<Routes>
					<Route index element={<Navigate to="hexie" replace />} />
					{/* <Route path="tensorflow" element={<TensorFlow />} /> */}
					{/* <Route path="linear-regression" element={<LinearRegression />} /> */}
					<Route path="hexie" element={<HexieEncoder />} />
					<Route path="idioms" element={<Idioms />} />
					<Route path="web-color-picker" element={<WebColorPicker />} />
					<Route path="regex-dictionary" element={<RegexDictionary />} />
				</Routes>
			</div>
		</section>
	);
};

export default Labs;
