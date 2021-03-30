import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SlotArea from '../components/SlotArea';
import { useDeck } from '../core';
import whevent from 'whevent';

import Button from '../../../../../components/common/Button';
import { setData, useData } from 'wherehouse';
import { EmojiSpin } from '../../../../../utils/store';

const SlotScreen = props => {
	const { deck, spin: getResult, result } = useDeck();
	const [cols, rows] = useData(EmojiSpin.DIMENTIONS);
	const state = useData(EmojiSpin.STATE);

	const onFinishSpin = useCallback(() => {
		console.log('finish');
		setData(EmojiSpin.STATE, 'IDLE');
	}, []);

	const spin = useCallback(() => {
		setData(EmojiSpin.STATE, 'SPINNING');
		whevent.emit('SPIN', getResult(deck, cols, rows));
	}, [deck, getResult]);

	useEffect(() => {
		whevent.on('DONE_SPIN', onFinishSpin);

		return () => whevent.off('DONE_SPIN', onFinishSpin);
	}, []);

	return (
		<section className="screen GameScreen">
			<div className="top-area">
				<SlotArea result={result} />
			</div>
			<div className="bottom-area">
				<Button onClick={spin} disabled={state !== 'IDLE'}>Spin</Button>
			</div>
		</section>
	);
};

export default SlotScreen;
