import React from 'react';
import { useTitle } from '../../hooks/misc';
import whi18n from 'whi18n';

const Home = props => {
	useTitle('wheatup');

	return (
		<div className="Home">
			<h2>{whi18n`wip`}</h2>
		</div>
	);
}

export default Home;