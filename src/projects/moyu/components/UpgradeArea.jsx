import React from 'react';
import { useUpgrades, useFish } from '../hooks/game';
import Upgrade from './Upgrades/Upgrade';
import { useCallback } from 'react';

const UpgradeArea = props => {
	const [upgrades, upgrade] = useUpgrades();
	const [fish, addFish] = useFish();

	const onUpgrade = useCallback((category, title, price) => {
		upgrade(category, title);
		addFish(-price);
	}, [upgrade, addFish]);

	return (
		<div className="UpgradeArea">
			<div className="upgrade-list">{[...Object.entries(upgrades.fish).map(([name, upgrade]) => (
				<Upgrade key={`upgrade-${name}`} category="fish" onUpgrade={onUpgrade} name={name} {...upgrade} />
			)), ...Object.entries(upgrades.misc).map(([name, upgrade]) => (
				<Upgrade key={`upgrade-${name}`} category="misc" onUpgrade={onUpgrade} name={name} {...upgrade} />
			))]}</div>
		</div>
	);
}

export default UpgradeArea;