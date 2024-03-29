import React, { useState } from 'react';
import EmojiSprite from './common/EmojiSprite';

const Slot = ({ slot, className }) => {
	return (
		<section data-column={slot.column} data-row={slot.row} className={`Slot${className ? ' ' + className : ''}`}>
			<div className="slot-content">{slot && slot.slot ? <EmojiSprite>{slot.slot.emoji}</EmojiSprite> : <span className="empty"></span>}</div>
		</section>
	);
};

export default Slot;
