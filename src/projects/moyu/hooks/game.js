import React, { useCallback, useEffect, useMemo } from "react";
import { setData, useData } from "wherehouse";
import { FISH, UPGRADES } from "../../../utils/store";

export const useGameLoop = fn => {
	useEffect(() => {
		let active = true;
		let lastUpdate = performance.now();

		const gameLoop = () => {
			let now = performance.now();
			fn(now - lastUpdate);
			lastUpdate = now;
			if (active) {
				requestAnimationFrame(gameLoop);
			}
		};

		gameLoop();

		return () => active = false;
	}, []);
};

export const useFish = () => {
	const fish = useData(FISH);

	const addFish = useCallback(amount => {
		setData(FISH, fish => fish + amount);
	}, []);

	return [fish, addFish];
}

let cooldown = Infinity;
export const useSpawnFish = onSpawnFish => {
	const { spawnRate, spawnOdds } = useStatus();

	const resetCooldown = useCallback(() => {
		cooldown = spawnRate + (spawnRate * (Math.random() - 0.5));
	}, []);

	const odds = useMemo(() => {
		const max = spawnOdds.reduce((acc, cur) => acc + cur[1], 0);
		let odd = [];
		let currentOdd = 0;

		spawnOdds.forEach(e => {
			currentOdd += e[1] / max;
			odd.push({id: e[0], odd: currentOdd});
		})
		return odd;
	}, spawnOdds);

	useEffect(() => {
		resetCooldown();
	}, []);

	useGameLoop(dt => {
		cooldown -= dt;
		if (cooldown <= 0) {
			const rnd = Math.random();
			let fish = 0;
			for(let {id, odd} of odds) {
				if (rnd < odd) {
					fish = id;
					break;
				}
			}

			onSpawnFish(fish);
			resetCooldown();
		}
	});
}

export const useStatus = () => {
	const [upgrades] = useUpgrades();

	const status = useMemo(() => {

		const fishTankSize = upgrades.misc.fishTankSize.effect.size[upgrades.misc.fishTankSize.level];
		const spawnRate = upgrades.misc.spawnRate.effect.size[upgrades.misc.spawnRate.level];
		const spawnOdds = Object.values(upgrades.fish).map(({ fishId, effect: { rates } }) => [fishId, rates]);
		const fishScores = Object.values(upgrades.fish).reduce((acc, cur) => ({...acc, [cur.fishId]: cur.effect.scores[cur.level]}), {})

		return {
			fishTankSize,
			spawnRate,
			spawnOdds,
			fishScores
		}
	}, [upgrades]);

	return status;
}

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
				requirements: [10, 100, 500, 1_000, 2_000, 5_000, 10_000, 20_000, 50_000, 100_000],
				effect: {
					scores: [1, 2, 3, 5, 10, 20, 30, 40, 50, 100, 1_000],
					rates: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
				},
				level: levels.fish.fish1
			},
			fish2: {
				fishId: 2,
				title: '鱼II',
				desc: '增加 鱼II 的价值与出现概率',
				icon: <span>II</span>,
				hidden: levels.fish.fish1 < 1,
				locked: levels.fish.fish1 < 4,
				requirements: [100, 1_000, 5_000, 10_000, 50_000, 100_000, 200_000, 500_000, 1_000_000, 10_000_000],
				effect: {
					scores: [3, 10, 20, 50, 100, 500, 1_000, 10_000, 50_000, 100_000, 200_000],
					rates: [1, 2, 5, 10, 15, 20, 25, 30, 35, 40, 50]
				},
				level: levels.fish.fish2
			}
		},

		misc: {
			fishTankSize: {
				title: '鱼塘',
				desc: '增加鱼塘可容纳的鱼的数量',
				icon: <span>鱼</span>,
				hidden: false,
				locked: false,
				requirements: [10_000, 100_000, 500_000, 1_000_000, 5_000_000, 10_000_000, 100_000_000, 1_000_000_000, 5_000_000_000, 100_000_000_000],
				effect: {
					size: [3, 4, 5, 6, 7, 8, 9, 10, 15, 20]
				},
				level: levels.misc.fishTankSize
			},
			spawnRate: {
				title: '出现概率',
				desc: '增加鱼塘产生鱼的速率',
				icon: <span>速</span>,
				hidden: false,
				locked: false,
				requirements: [10_000, 100_000, 500_000, 1_000_000, 5_000_000, 10_000_000, 100_000_000, 1_000_000_000, 5_000_000_000, 100_000_000_000],
				effect: {
					size: [10000, 8000, 6500, 5000, 4000, 3000, 2500, 2000, 1750, 1500]
				},
				level: levels.misc.fishTankSize
			}
		}


	}), [levels]);

	return [upgrades];
}