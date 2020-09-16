import React, { useCallback, useMemo } from 'react';
import { useFish } from '../../hooks/game';

const Upgrade = ({ category, name, title, desc, level = 0, locked, hidden, icon, requirements, onUpgrade }) => {
	const [fish] = useFish();

	const price = useMemo(() => requirements[level], [requirements, level]);

	const affordable = useMemo(() =>  price <= fish, [price, fish]);

	const onClickUpgrade = useCallback(() => {
		if(!affordable || locked) return;
		onUpgrade(category, name, price);
	}, [affordable, locked, price]);

	return !hidden && (
		<a onClick={onClickUpgrade} href="javascript: void(0)" className={`Upgrade${affordable ? '' : ' ins'}${locked ? ' locked' : ''}`}>
			<div className="icon-area">
				{icon}
			</div>
			<div className="title-area">
				<h2>{title}</h2>
				<p>{desc}</p>
				<h3><i className="icon-fish"></i>{price}</h3>
			</div>
			<div className="level-area">
				<h2>Lv. {level}</h2>
				<figure>{Array.from({ length: 10 }, (_, i) => <span key={`point_${i}`} className={i < level ? 'active' : ''}></span>)}</figure>
			</div>
		</a>
	);
}

export default Upgrade;