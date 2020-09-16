import React, { useState, useCallback, useEffect } from 'react';
import { useFish, useStatus } from '../hooks/game';
import whevent from 'whevent';
import {  } from 'react';

const InfoArea = props => {
	const [fish] = useFish();
	const { fishTankSize } = useStatus();
	const [currentFish, setCurrentFish] = useState(0);

	const onFishList = useCallback(list => {
		setCurrentFish(list.length);
	}, [setCurrentFish]);
	

	useEffect(() => {
		whevent.on('FISH_LIST', onFishList);
		return () => whevent.off('FISH_LIST', onFishList);
	}, []);



	return (
		<div className="InfoArea">
			<div className="fish-count">
				<i className="icon-fish"></i>
				<span>{fish}</span>
			</div>
			<div className="fish-amount">
				{currentFish}/{fishTankSize}
			</div>
		</div>
	);
}

export default InfoArea;