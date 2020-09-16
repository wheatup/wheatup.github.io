import React, { useCallback, useEffect, useState } from 'react';
import { useSpawnFish } from '../hooks/game';
import Fish from './FishTank/Fish';

let ID = 0;
const FishTank = props => {
	const [fishList, setFishList] = useState([]);

	const spawnFish = useCallback(tier => {
		++ID;
		setFishList(list => [...list, { id: ID, tier, point: 1 }])
	}, [setFishList]);

	useSpawnFish(spawnFish);

	return (
		<div className="FishTank">{fishList.map(fish => (
			<Fish key={`fish-${fish.id}`} {...fish} />
		))}</div>
	);
}

export default FishTank;