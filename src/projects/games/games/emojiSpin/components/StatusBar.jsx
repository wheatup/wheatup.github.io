import React, { useState } from 'react';
import { useData } from 'wherehouse';
import { EmojiSpin } from '../../../../../utils/store';
import EmojiSprite from './common/EmojiSprite';

const StatusBar = props => {

	const coins = useData(EmojiSpin.COINS);

	return (
		<section className="StatusBar">
			<div className="coins"><EmojiSprite>🪙</EmojiSprite> <span>{coins}</span></div>
		</section>
	);
}

export default StatusBar;