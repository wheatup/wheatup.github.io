import React, { useEffect, useMemo, useState } from 'react';
import { useCallback } from 'react';

const Particle = ({ startingX, startingY, blur, moveDirection, spinDirection, moveDuration, spinDuration, timing, size }) => {
	const containeStyle = useMemo(
		() => ({
			animationDirection: moveDirection > 0 ? 'initial' : 'reverse',
			animationDuration: moveDuration + 's',
			animationDelay: timing * -1 + 's',
			top: startingY * 100 + '%',
			'--size': size + 'rem'
		}),
		[]
	);

	const particleStyle = useMemo(
		() => ({
			animationDirection: spinDirection > 0 ? 'initial' : 'reverse',
			animationDuration: spinDuration + 's',
			left: startingX * 100 + '%',
			width: size + 'rem',
			height: size + 'rem',
			filter: `blur(${1 + blur * 3}px)`
		}),
		[]
	);

	return (
		<div className="particle-container" style={containeStyle}>
			<div className="particle" style={particleStyle}></div>
		</div>
	);
};

const Background = props => {
	const particles = useMemo(
		() => [
			...(function* () {
				for (let i = 0; i < 16; i++) {
					const startingX = Math.random();
					const startingY = Math.random();
					const moveDirection = Math.random() > 0.5 ? -1 : 1;
					const spinDirection = Math.random() > 0.5 ? -1 : 1;
					const moveDuration = 50 + Math.random() * 300;
					const spinDuration = 50 + Math.random() * 300;
					const timing = Math.random() * moveDuration;
					const blur = Math.random();
					const size = 10 + blur * 25;

					yield <Particle {...{ startingX, startingY, blur, moveDirection, spinDirection, moveDuration, spinDuration, timing, size }} />;
				}
			})()
		],
		[]
	);

	const [ratio, setRatio] = useState(0);

	const onScroll = useCallback(({ target: { scrollHeight, clientHeight, scrollTop } }) => {
		const percentage = scrollTop / (scrollHeight - clientHeight);
		setRatio(percentage);
	}, []);

	useEffect(() => {
		document.querySelector('main').addEventListener('scroll', onScroll);
		return () => {
			document.querySelector('main').removeEventListener('scroll', onScroll);
		};
	}, []);

	return (
		<section className="Background" style={{ '--ratio': ratio }}>
			{particles}
		</section>
	);
};

export default Background;
