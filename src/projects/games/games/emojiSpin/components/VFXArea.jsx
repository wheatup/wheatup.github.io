import React, { useCallback, useEffect, useRef, useState } from 'react';
import whevent from 'whevent';

const VFXArea = props => {
	const scoresRef = useRef(null);
	const onCalcScore = useCallback(
		({ column, row, slot }, value) => {
			console.log({ column, row, slot }, value);
			const cell = document.querySelector(`.slots.real .Slot[data-column='${column}'][data-row='${row}']`);
			const [x, y] = (() => {
				const { x: ax, y: ay, width, height } = cell.getBoundingClientRect();
				const { x: dx, y: dy } = scoresRef.current.getBoundingClientRect();
				const x = ax - dx + width / 2;
				const y = ay - dy + height / 2;
				return [x, y];
			})();
			const scoreDiv = document.createElement('span');
			scoreDiv.classList.add('score');
			scoreDiv.innerText = value;
			scoreDiv.style.top = `${y}px`;
			scoreDiv.style.left = `${x}px`;
			scoresRef.current.appendChild(scoreDiv);
		},
		[scoresRef]
	);

	useEffect(() => {
		whevent.on('CALC_SCORE', onCalcScore);
		return () => whevent.off('CALC_SCORE', onCalcScore);
	});

	return (
		<section className="VFXArea">
			<div class="scores" ref={scoresRef}></div>
		</section>
	);
};

export default VFXArea;
