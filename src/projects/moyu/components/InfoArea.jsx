import React, { useEffect } from 'react';
import { useFish } from '../hooks/game';

const InfoArea = props => {
	const [fish] = useFish();

	return (
		<div className="InfoArea">
			<div>
				<i className="icon-fish"></i>
				<span>{fish}</span>
			</div>
		</div>
	);
}

export default InfoArea;