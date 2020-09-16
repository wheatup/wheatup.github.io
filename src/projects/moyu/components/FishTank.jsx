import React, { useCallback, useEffect, useState } from 'react';
import { useData } from 'wherehouse';
import { useFish, useSpawnFish, useStatus, useUpgrades } from '../hooks/game';
import Fish from './FishTank/Fish';

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
			if (list.length > fishTankSize) {
				return list;
			}
			return [...list, { id: ID, tier: fishId, point: fishScores[fishId] }];
		})
	}, [setFishList, status]);

	useSpawnFish(spawnFish);

	return (
		<div className="FishTank">{fishList.map(fish => (
			<Fish key={`fish-${fish.id}`} {...fish} onRemoveFish={onRemoveFish} />
		))}</div>
	);
}

export default FishTank;