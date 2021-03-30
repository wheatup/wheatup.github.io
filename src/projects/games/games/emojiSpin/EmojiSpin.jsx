import React, { useState } from 'react';
import StatusBar from './components/StatusBar';
import SlotScreen from './screens/SlotScreen';

const EmojiSpin = props => {
	

	return (
		<section className="EmojiSpin">
			<StatusBar />
			<div className="screens">
				<SlotScreen />
			</div>
		</section>
	);
};

export default EmojiSpin;
