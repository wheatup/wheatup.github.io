import React, { useCallback, useMemo, useState } from 'react';
import { useFish } from '../../hooks/game';
import { numberer } from '../utils/utils';

const Upgrade = (props) => {
	const { category, name, title, desc, level = 0, locked, hidden, icon, requirements, onUpgrade, effectText } = props;
	const [fish] = useFish();
	const [hovering, setHovering] = useState(false);

	const price = useMemo(() => requirements(level), [requirements, level]);

	const affordable = useMemo(() => price <= fish, [price, fish]);

	const onClickUpgrade = useCallback(() => {
		if (!affordable || locked) return;
		onUpgrade(category, name, price);
	}, [affordable, locked, price]);

	return !hidden && (
		<a onMouseOver={() => setHovering(true)} onMouseLeave={() => setHovering(false)} onClick={onClickUpgrade} href="javascript: void(0)" className={`Upgrade${affordable ? '' : ' ins'}${locked ? ' locked' : ''}`}>
			<div className="icon-area">
				{icon}
			</div>
			<div className="title-area">
				<h2>{title}</h2>
				<p>{desc}</p>
				<h3><i className="icon-fish"></i>{numberer(price)}</h3>
			</div>
			<div className="level-area">
				<h2>Lv. {level}</h2>
				<figure>{Array.from({ length: 10 }, (_, i) => <span key={`point_${i}`} className={i < level ? 'active' : ''}></span>)}</figure>
				<h4 className={hovering && affordable && !locked ? 'preview' : ''}>{props.effectText && props.effectText(hovering && affordable && !locked ? level + 1 : level)}</h4>
			</div>
		</a>
	);
}

export default Upgrade;