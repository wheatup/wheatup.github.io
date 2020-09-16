import React, { useCallback, useEffect, useState } from 'react';
import { useData } from 'wherehouse';
import { FISH_STATUS } from '../../../utils/store';
import { useFish, useSpawnFish } from '../hooks/game';
import Fish from './FishTank/Fish';

let ID = 0;
const FishTank = props => {
	const [fishList, setFishList] = useState([]);
	const status = useData(FISH_STATUS);

	const onRemoveFish = useCallback(id => {
		setFishList(list => list.filter(fish => fish.id !== id));
	}, [setFishList, fishList]);

	const spawnFish = useCallback(tier => {
		++ID;
		setFishList(list => {
			if (list.length > status.maxFish) {
				return list;
			}
			return [...list, { id: ID, tier, point: (status.tierScores[tier] || 1) * (status.tierMultipliers[tier] || 1)}];
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