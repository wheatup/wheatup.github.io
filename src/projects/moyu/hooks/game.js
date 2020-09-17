import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { setData, useData } from 'wherehouse';
import { FISH, UPGRADES } from '../../../utils/store';
import { numberer } from '../components/utils/utils';

const cache = {

};

export const useFish = () => {
	const fish = useData(FISH);

	const addFish = useCallback((amount) => {
		setData(FISH, (fish) => fish + amount);
	}, []);

	return [fish, addFish];
};

export const useSpawnFish = (onSpawnFish) => {
	const status = useStatus();
	const { spawnRate, spawnOdds } = status;
	const [timers, setTimers] = useState([]);

	useEffect(() => {
		Object.entries(spawnOdds).forEach(([key, rate], i) => {
			if (timers[i]) {
				clearTimeout(timers[i]);
			}
			const spawn = () => {
				const timer = setTimeout(() => {
					onSpawnFish(key);
					spawn();
				}, (rate + rate * (Math.random() - 0.25)) * spawnRate);

				setTimers(ts => {
					const _ts = [...ts];
					_ts[i] = timer;
					return _ts;
				});
				return timer;
			};
			spawn();
		});

	}, [status])



	// const spawn = useCallback(() => {
	// 	const rnd = Math.random();
	// 	let fish = 0;
	// 	for (let [id, odd] of Object.entries(odds)) {
	// 		if (rnd < odd) {
	// 			fish = id;
	// 			break;
	// 		}
	// 	}

	// 	onSpawnFish(fish);
	// }, [odds]);

	// useInterval(spawn, () => spawnRate + spawnRate * (Math.random() - 0.5));
};

export const useStatus = () => {
	const [upgrades] = useUpgrades();

	const status = useMemo(() => {
		const fishTankSize = upgrades.misc.fishTankSize.effect(upgrades.misc.fishTankSize.level);
		const spawnRate = upgrades.misc.spawnRate.effect(upgrades.misc.spawnRate.level);
		const spawnOdds = Object.values(upgrades.fish).reduce((acc, { fishId, level, effect: { rates } }) => {
			if (!rates(level)) return acc;
			return { ...acc, [fishId]: rates(level) };
		}, {});
		const fishScores = Object.values(upgrades.fish).reduce((acc, cur) => ({ ...acc, [cur.fishId]: cur.effect.scores(cur.level) }), {});
		const fishMultiplier = upgrades.misc.fishMultiplier.effect(upgrades.misc.fishMultiplier.level);

		return {
			fishTankSize,
			spawnRate,
			spawnOdds,
			fishScores,
			fishMultiplier
		};
	}, [upgrades]);

	return status;
};

export const useUpgrades = () => {
	const levels = useData(UPGRADES);

	const fishMultipliers = [
		1,
		1.05, 1.1, 1.25, 1.33, 1.5, 1.66, 1.75, 2, 2.5, 3
	];

	const effectText = function (i) {
		const score = this.effect.scores(i);
		const rate = this.effect.rates(i);
		const multiplier = fishMultipliers[levels.misc.fishMultiplier];

		return (
			<span className="effect">
				<div>
					<i className="icon-fish"></i>
					<span>{score ? numberer(score * multiplier) : '-'}</span>
				</div>
				<div>
					<i className="icon-clock"></i>
					<span>{rate ? (rate / 1000).toLocaleString() + 's' : '-'}</span>
				</div>
			</span>
		);
	};

	const upgrades = useMemo(() => {
		if (cache.upgrades) {
			return cache.upgrades;
		}

		return {
			fish: {
				fish1: {
					fishId: 1,
					title: '鱼I',
					desc: '增加 鱼I 的价值',
					icon: <span>I</span>,
					locked: false,
					hidden: false,
					requirements: i => [
						3, 10, 25, 64, 128, 256, 512, 1280, 2540, 10000
					][i],
					effect: {
						scores: i => [
							1,
							3, 6, 11, 19, 32, 52, 96, 192, 306, 580
						][i],
						rates: i => [
							10000,
							9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1500, 1000
						][i]
					},
					level: levels.fish.fish1,
					effectText
				},
				fish2: {
					fishId: 2,
					title: '鱼II',
					desc: '增加 鱼II 的价值与出现概率',
					icon: <span>II</span>,
					hidden: levels.fish.fish1 < 1,
					locked: levels.fish.fish1 < 3,
					requirements: i => [
						50, 600, 1900, 4000, 8900, 18300, 24500, 39800, 77600, 100000
					][i],
					effect: {
						scores: i => [
							0,
							60, 120, 240, 520, 500, 998, 1600, 2400, 4800, 9600
						][i],
						rates: i => [
							0,
							15000, 7000, 6000, 5000, 4500, 4000, 3500, 3000, 2750, 2500
						][i]
					},
					level: levels.fish.fish2,
					effectText
				},
				fish3: {
					fishId: 3,
					title: '鱼III',
					desc: '增加 鱼III 的价值与出现概率',
					icon: <span>II</span>,
					hidden: levels.fish.fish2 < 1,
					locked: levels.fish.fish2 < 3,
					requirements: i => [
						50, 600, 1900, 4000, 8900, 18300, 24500, 39800, 77600, 100000
					][i],
					effect: {
						scores: i => [
							0,
							60, 120, 240, 520, 500, 998, 1600, 2400, 4800, 9600
						][i],
						rates: i => [
							0,
							8000, 7000, 6000, 5000, 4500, 4000, 3500, 3000, 2750, 2500
						][i]
					},
					level: levels.fish.fish3,
					effectText
				}
			},

			misc: {
				fishMultiplier: {
					title: '鱼价',
					desc: '增加全局鱼的价值',
					icon: <i className="icon-fish"></i>,
					hidden: false,
					locked: false,
					requirements: i => [
						2000, 3500, 10000, 50000, 100000, 500000, 1000000, 10000000, 50000000, 9999999999
					][i],
					effect: i => fishMultipliers[i],
					level: levels.misc.fishMultiplier,
					effectText: function (i) {
						const multiplier = this.effect(i);
				
						return (
							<span className="effect">
								<div>
									<span>x{multiplier}</span>
								</div>
							</span>
						);
					}
				},
				fishTankSize: {
					title: '鱼塘',
					desc: '增加鱼塘可容纳的鱼的数量',
					icon: <span>鱼</span>,
					hidden: false,
					locked: levels.fish.fish4 < 5,
					requirements: i => (i + 1) * 2,
					effect: i => 5 * (i + 1),
					level: levels.misc.fishTankSize
				},
				spawnRate: {
					title: '出现概率',
					desc: '增加鱼塘产生鱼的速率',
					icon: <span>速</span>,
					hidden: false,
					locked: levels.fish.fish4 < 5,
					requirements: i => (i + 1) * 2,
					effect: i => Math.max(1 - i * 0.1, 0.1),
					level: levels.misc.spawnRate
				}
			}
		}
	}, [levels]);

	const upgrade = useCallback((category, item) => {
		setData(UPGRADES, up => ({
			...up,
			[category]: {
				...up[category],
				[item]: up[category][item] + 1
			}
		}));
	}, []);

	return [upgrades, upgrade];
};
