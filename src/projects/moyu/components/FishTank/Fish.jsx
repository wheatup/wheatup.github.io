import React, { useCallback, useEffect, useState } from 'react';
import { useFish, useStatus } from '../../hooks/game';
import { useMemo } from 'react';
import { useInterval } from '../../hooks/common';


const Fish = ({ fishId, id, onRemoveFish }) => {
	const [active, setActive] = useState(true);
	const [coord, setCoord] = useState([Math.random() > 0.5 ? -0.5 : 1.5, Math.random(), 1, 1000]);

	const move = useCallback(() => {
		setCoord(([x, y]) => {
			const dirX = Math.random() > x ? 1 : -1;
			const dirY = Math.random() > y ? 1 : -1;
			const _x = x + (dirX > 0 ? 1 - x : x) * Math.random() * dirX;
			const _y = y + (dirY > 0 ? 1 - y : y) * Math.random() * dirY;

			const dist = Math.sqrt((_x - x) ** 2 + (_y - y) ** 2);
			const duration = dist * 5000;

			return [_x, _y, dirX, duration];
		});
	}, [setCoord]);

	useInterval(move, () => 3000 + Math.random() * 3000, () => !active);
	useEffect(() => {
		setTimeout(move, 50);
	}, []);

	const [fish, addFish] = useFish();
	const status = useStatus();

	const score = useMemo(() => {
		return status.fishScores[fishId];
	}, [status]);

	const onClickFish = useCallback(() => {
		if (!active) return;

		setActive(false);
		setCoord(([x, y]) => [x, y, 1, 1]);
		addFish(score);
		setTimeout(() => {
			onRemoveFish(id);
		}, 1000);
	}, [active, score]);

	return (
		<div className={`Fish${active ? '' : ' dead'}`} id={`fish-${id}`} onClick={onClickFish} style={{ '--x': coord[0], '--y': coord[1], '--dir': coord[2], '--duration': coord[3] }}>
			<img src={`/images/moyu/fish-${fishId}.svg`} />
			<span className="fish-score">{score}</span>
		</div>
	);
}

export default Fish;