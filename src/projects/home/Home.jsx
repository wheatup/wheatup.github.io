import React from 'react';
import { useTitle } from '../../hooks/misc';
import $$ from 'whi18n';

const Home = props => {
	useTitle('wheatup');

	return (
		<div className={`Home${window.CSS.registerProperty ? '' : ' not-support'}`}>
			<h2 data-fallback={$$`wip`}></h2>
		</div>
	);
};

export default Home;
