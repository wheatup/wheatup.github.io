import React from 'react';
import { useTitle } from '../../hooks/misc';
import FishTank from './components/FishTank';
import InfoArea from './components/InfoArea';
import UpgradeArea from './components/UpgradeArea';

const Moyu = props => {
	useTitle('摸鱼');

	return (
		<div className="Moyu">
			<div className="top-area">
				<InfoArea />
				<FishTank />
			</div>
			<div className="bottom-area">
				<UpgradeArea />
			</div>
		</div>
	);
}

export default Moyu;