import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Wheen } from 'wheen';
import { useFish, useGameLoop } from '../../hooks/game';


const Fish = ({ tier, point, id, onRemoveFish }) => {
	const [active, setActive] = useState(true);
	const [coord, setCoord] = useState([Math.random() > 0.5 ? -0.5 : 1.5, Math.random(), 1, 1000]);

	const move = useCallback(() => {
		if (!active) return;
		setCoord(([x, y]) => {
			const dirX = Math.random() > x ? 1 : -1;
			const dirY = Math.random() > y ? 1 : -1;
			const _x = x + (dirX > 0 ? 1 - x : x) * Math.random() * dirX;
			const _y = y + (dirY > 0 ? 1 - y : y) * Math.random() * dirY;

			const dist = Math.sqrt((_x - x) ** 2 + (_y - y) ** 2);
			const duration = dist * 5000;

			return [_x, _y, dirX, duration];
		});

		setTimeout(move, 3000 + Math.random() * 3000)
	}, [active])

	useEffect(() => {
		move();
	}, []);

	const [fish, addFish] = useFish();

	const onClickFish = useCallback(() => {
		if(!active) return;

		setActive(false);
		setCoord(([x, y]) => [x, y, 1, 1]);
		addFish(point);
		setTimeout(() => {
			onRemoveFish(id);
		}, 2000);
	}, [active]);

	return (
		<div className={`Fish${active ? '' : ' dead'}`} id={`fish-${id}`} onClick={onClickFish} style={{ '--x': coord[0], '--y': coord[1], '--dir': coord[2], '--duration': coord[3] }}>
			<img src={`/images/moyu/fish-${tier + 1}.svg`} />
			<span class="fish-score">{point}</span>
		</div>
	);
}

export default Fish;