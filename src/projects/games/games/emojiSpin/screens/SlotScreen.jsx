import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SlotArea from '../components/SlotArea';
import VFXArea from '../components/VFXArea';
import { calculateSlot, useDeck } from '../core';
import whevent from 'whevent';

import Button from '../../../../../components/common/Button';
import { getData, setData, useData } from 'wherehouse';
import { EmojiSpin } from '../../../../../utils/store';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const SlotScreen = props => {
	const { deck, spin: getResult, result } = useDeck();
	const [cols, rows] = useData(EmojiSpin.DIMENTIONS);
	const state = useData(EmojiSpin.STATE);

	const onFinishSpin = useCallback(async () => {
		setData(EmojiSpin.STATE, 'CALCULATING');
		const result = getData(EmojiSpin.SPIN_RESULT);

		for (let row = 0; row < result.rows; row++) {
			for (let col = 0; col < result.cols; col++) {
				const target = result.columns[col].slots[row];
				const { value, boosters } = await calculateSlot(result, target);

				if (boosters.length > 0) {
					whevent.emit('BOOSTERS', target, boosters);
					await wait(300);
				}

				if (value) {
					whevent.emit('CALC_SCORE', target, value);
					setData(EmojiSpin.COINS, val => val + value);
					await wait(300);
				}
			}
		}

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
				<VFXArea />
			</div>
			<div className="bottom-area">
				<Button onClick={spin} disabled={state !== 'IDLE'}>
					Spin
				</Button>
			</div>
		</section>
	);
};

export default SlotScreen;
