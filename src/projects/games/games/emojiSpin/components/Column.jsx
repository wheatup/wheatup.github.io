import React, { useCallback, useEffect, useState } from 'react';
import Slot from './Cell';
import whevent from 'whevent';
import { setData, useData } from 'wherehouse';
import { EmojiSpin } from '../../../../../utils/store';

let shouldDelay = false;
const Column = ({ column }) => {
	const [bias, setBias] = useState(0);
	const [spinning, setSpinning] = useState(false);
	const [stored, setStored] = useState(column);
	const [cols] = useData(EmojiSpin.DIMENTIONS);

	const onSpin = useCallback(() => {
		shouldDelay = true;
		let phase = 0;
		const ease = t => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1);
		const step = () => {
			phase += 0.02;
			let bias = ease(phase) * 1000;
			setBias(bias);
			if (phase < 1) {
				requestAnimationFrame(step);
			} else {
				if (column.column === cols - 1) {
					whevent.emit('DONE_SPIN');
				}
				setBias(0);
				setSpinning(false);
			}
		};

		setTimeout(() => {
			setSpinning(true);
			step();
		}, column.column * 50);
	}, []);

	useEffect(() => {
		whevent.on('SPIN', onSpin);

		return () => whevent.off('SPIN', onSpin);
	}, []);

	useEffect(() => {
		if (!shouldDelay) {
			setStored(column);
		} else {
			setTimeout(() => {
				setStored(column);
			}, 500 + column.column * 50);
		}
	}, [column]);

	return (
		<section data-column={column.column} className={'Column' + (spinning ? ' spinning' : '')}>
			<div className="column-wrapper" style={{ '--bias': bias % 100 }}>
				<div className="slots fake">
					{stored.slots.map(slot => (
						<Slot key={`slot_${slot.column}_${slot.row}`} slot={slot} />
					))}
				</div>
				<div className="slots real">
					{stored.slots.map(slot => (
						<Slot data-column={slot.column} data-row={slot.column} key={`slot_${slot.column}_${slot.row}`} slot={slot} />
					))}
				</div>
			</div>
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
				<defs>
					<filter id="blur">
						<feGaussianBlur in="SourceGraphic" stdDeviation="0,8" />
					</filter>
				</defs>
			</svg>
		</section>
	);
};

export default Column;
