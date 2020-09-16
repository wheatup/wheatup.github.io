import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { setData, useData } from 'wherehouse';
import { FISH, UPGRADES } from '../../../utils/store';
import { useInit, useInterval } from './common';

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
		console.log('loop');
		Object.entries(spawnOdds).forEach(([key, rate], i) => {
			if(timers[i]) {
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
		const fishTankSize = upgrades.misc.fishTankSize.effect.size[upgrades.misc.fishTankSize.level];
		const spawnRate = upgrades.misc.spawnRate.effect.size[upgrades.misc.spawnRate.level];
		const spawnOdds = Object.values(upgrades.fish).reduce((acc, { fishId, level, effect: { rates } }) => {
			if (!rates[level]) return acc;
			return { ...acc, [fishId]: rates[level] };
		}, {});
		const fishScores = Object.values(upgrades.fish).reduce((acc, cur) => ({ ...acc, [cur.fishId]: cur.effect.scores[cur.level] }), {});

		return {
			fishTankSize,
			spawnRate,
			spawnOdds,
			fishScores
		};
	}, [upgrades]);

	return status;
};

export const useUpgrades = () => {
	const levels = useData(UPGRADES);

	const upgrades = useMemo(() => ({
		fish: {
			fish1: {
				fishId: 1,
				title: '鱼I',
				desc: '增加 鱼I 的价值',
				icon: <span>I</span>,
				locked: false,
				hidden: false,
				requirements: [3, 5, 10, 20, 35, 50, 100, 200, 500, 1000],
				effect: {
					scores: [1, 2, 3, 5, 7, 10, 20, 30, 40, 50, 100],
					rates: [5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000],
				},
				level: levels.fish.fish1
			},
			fish2: {
				fishId: 2,
				title: '鱼II',
				desc: '增加 鱼II 的价值与出现概率',
				icon: <span>II</span>,
				hidden: levels.fish.fish1 < 1,
				locked: levels.fish.fish1 < 5,
				requirements: [100, 1_000, 5_000, 10_000, 20_000, 50_000, 100_000, 250_000, 500_000, 1_000_000],
				effect: {
					scores: [100, 150, 200, 500, 1_000, 5_000, 10_000, 25_000, 50_000, 75_000, 100_000],
					rates: [0, 10000, 9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000]
				},
				level: levels.fish.fish2
			},
			fish3: {
				fishId: 3,
				title: '鱼III',
				desc: '增加 鱼III 的价值与出现概率',
				icon: <span>II</span>,
				hidden: levels.fish.fish2 < 1,
				locked: levels.fish.fish2 < 5,
				requirements: [1_000, 5_000, 10_000, 50_000, 100_000, 200_000, 500_000, 1_000_000, 50_000_000, 10_000_000],
				effect: {
					scores: [3, 10, 20, 50, 100, 500, 1_000, 10_000, 50_000, 100_000, 200_000],
					rates: [0, 10000, 9000, 8000, 7000, 6000, 5000, 4500, 4000, 3500, 3000]
				},
				level: levels.fish.fish3
			}
		},

		misc: {
			fishTankSize: {
				title: '鱼塘',
				desc: '增加鱼塘可容纳的鱼的数量',
				icon: <span>鱼</span>,
				hidden: levels.fish.fish3 < 1,
				locked: levels.fish.fish4 < 5,
				requirements: [10_000, 100_000, 500_000, 1_000_000, 5_000_000, 10_000_000, 100_000_000, 1_000_000_000, 5_000_000_000, 100_000_000_000],
				effect: {
					size: [5, 7, 10, 15, 20, 30, 40, 50, 100, 200, 500]
				},
				level: levels.misc.fishTankSize
			},
			spawnRate: {
				title: '出现概率',
				desc: '增加鱼塘产生鱼的速率',
				icon: <span>速</span>,
				hidden: levels.fish.fish3 < 1,
				locked: levels.fish.fish4 < 5,
				requirements: [10_000, 100_000, 500_000, 1_000_000, 5_000_000, 10_000_000, 100_000_000, 1_000_000_000, 5_000_000_000, 100_000_000_000],
				effect: {
					size: [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1]
				},
				level: levels.misc.spawnRate
			}
		}
	}), [levels]);

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
