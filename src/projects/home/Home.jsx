import React from 'react';
import { useTitle } from '../../hooks/misc';

const Home = props => {
	useTitle('wheatup');

	return (
		<div className="Home">
			<h2>施工中，请稍后再来</h2>
		</div>
	);
}

export default Home;