import React, { useEffect } from 'react';
import { useUpgrades } from '../hooks/game';
import Upgrade from './Upgrades/Upgrade';

const UpgradeArea = props => {
	const [upgrades] = useUpgrades();

	return (
		<div className="UpgradeArea">
			<div class="upgrade-list">{upgrades.map(upgrade => (
				<Upgrade key={`upgrade-${upgrade.id}`} {...upgrade} />
			))}</div>
		</div>
	);
}

export default UpgradeArea;