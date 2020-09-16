import React, { useEffect } from 'react';
import { useUpgrades } from '../hooks/game';
import Upgrade from './Upgrades/Upgrade';

const UpgradeArea = props => {
	const [upgrades] = useUpgrades();

	return (
		<div className="UpgradeArea">
			<div class="upgrade-list">{Object.entries(upgrades.fish).map(([name, upgrade]) => (
				<Upgrade key={`upgrade-${name}`} {...upgrade} />
			))}</div>
		</div>
	);
}

export default UpgradeArea;