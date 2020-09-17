import React, { useCallback, useEffect, useState } from 'react';
import { useSpawnFish, useStatus } from '../hooks/game';
import Fish from './FishTank/Fish';
import whevent from 'whevent';

let ID = 0;
const FishTank = props => {
	const [fishList, setFishList] = useState([]);
	const status = useStatus();
	const { fishTankSize, fishScores } = status;

	const onRemoveFish = useCallback(id => {
		setFishList(list => list.filter(fish => fish.id !== id));
	}, [setFishList, fishList]);

	const spawnFish = useCallback(fishId => {
		++ID;
		setFishList(list => {
			if (list.length >= fishTankSize) {
				return list;
			}
			return [...list, { id: ID, fishId }];
		})
	}, [setFishList, status]);

	useSpawnFish(spawnFish);

	useEffect(() => {
		whevent.emit('FISH_LIST', fishList);
	}, [fishList]);

	return (
		<div className="FishTank">{fishList.map(fish => (
			<Fish key={`fish-${fish.id}`} {...fish} onRemoveFish={onRemoveFish} />
		))}</div>
	);
}

export default FishTank;