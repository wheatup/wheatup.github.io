import React, { useState } from 'react';
import { useUpgrades, useFish } from '../hooks/game';
import Upgrade from './Upgrades/Upgrade';
import { useCallback } from 'react';

const CategoryTag = ({ title, category, current, onClickTag }) => {
	return (
		<a href="javascript: void(0)" className={`CategoryTag${current ? ' current' : ''}`} onClick={() => onClickTag(category)}>{title}</a>
	);
}

const categories = [
	{ title: '鱼', category: 'fish' },
	{ title: '其他', category: 'misc' },
];

const UpgradeArea = props => {
	const [upgrades, upgrade] = useUpgrades();
	const [fish, addFish] = useFish();
	const [category, setCategory] = useState('fish');

	const onUpgrade = useCallback((category, title, price) => {
		upgrade(category, title);
		addFish(-price);
	}, [upgrade, addFish]);

	const onClickTag = useCallback(category => {
		setCategory(category);
	}, [setCategory]);

	return (
		<div className="UpgradeArea">
			<div className="category-list">{categories.map(({ title, category: cat },) => (
				<CategoryTag key={`category-${cat}`} title={title} current={category === cat} category={cat} onClickTag={onClickTag} />
			))}</div>
			<div className="upgrade-list">{Object.entries(upgrades[category]).map(([name, upgrade]) => (
				<Upgrade key={`upgrade-${name}`} category={category} onUpgrade={onUpgrade} name={name} {...upgrade} />
			))}</div>
		</div>
	);
}

export default UpgradeArea;