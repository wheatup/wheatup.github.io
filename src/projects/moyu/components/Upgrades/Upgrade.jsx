import React, { useEffect, useMemo } from 'react';
import { useFish } from '../../hooks/game';

const Upgrade = ({ title, desc, level = 0, locked, hidden, icon, requirements }) => {
	const [fish] = useFish();

	const price = useMemo(() => requirements[level + 1], [requirements, level]);

	const affordable = useMemo(() =>  price < fish, [price, fish]);

	if(hidden) {
		return null;
	}

	return (
		<a href="javascript: void(0)" className={`Upgrade${affordable ? '' : ' ins'}${locked ? ' locked' : ''}`}>
			<div className="icon-area">
				{icon}
			</div>
			<div className="title-area">
				<h2>{title}</h2>
				<p>{desc}</p>
				<h3><i className="icon-fish"></i>{requirements[level + 1]}</h3>
			</div>
			<div className="level-area">
				<h2>Lv. {level}</h2>
				<figure>{Array.from({ length: 10 }, (_, i) => <span className={i < level ? 'active' : ''}></span>)}</figure>
			</div>
		</a>
	);
}

export default Upgrade;