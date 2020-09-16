import React, { useCallback, useEffect, useMemo } from "react";
import { setData, useData } from "wherehouse";
import { FISH, FISH_STATUS } from "../../../utils/store";

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

let cooldown = 10000;
export const useSpawnFish = onSpawnFish => {
	const { spawnInterval, spawnRate } = useData(FISH_STATUS);

	const resetCooldown = useCallback(() => {
		cooldown = spawnInterval + (spawnInterval * (Math.random() - 0.5));
	}, []);

	const rates = useMemo(() => {
		const max = spawnRate.reduce((acc, cur) => acc + cur, 0);
		let rate = [];
		let currentRate = 0;
		spawnRate.forEach(e => {
			currentRate += e / max;
			rate.push(currentRate);
		})
		return rate;
	}, spawnRate);

	useEffect(() => {
		cooldown = spawnInterval;
	}, []);

	useGameLoop(dt => {
		cooldown -= dt;
		if (cooldown <= 0) {
			const rnd = Math.random();
			let fish = 0;
			for (let i = 0; i < rates.length; i++) {
				if (rnd < rates[i]) {
					fish = i;
					break;
				}
			}

			onSpawnFish(fish);
			resetCooldown();
		}
	});
}


export const useUpgrades = () => {
	const status = useData(FISH_STATUS);

	const upgrades = useMemo(() => [
		{
			title: '鱼I',
			id: 'fish1',
			desc: '增加 鱼I 的价值',
			icon: <span>I</span>,
			locked: false,
			requirements: [10, 100, 500, 1_000, 2_000, 5_000, 10_000, 20_000, 50_000, 100_000],
			effect: [
				[2, 3, 5, 10, 20, 30, 40, 50, 100, 1_000],
				[10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
			],
			level: status.upgrades.fish1
		}, {
			title: '鱼II',
			id: 'fish2',
			desc: '增加 鱼II 的价值与出现概率',
			icon: <span>II</span>,
			locked: status.upgrades.fish1 < 4,
			requirements: [100, 1_000, 5_000, 10_000, 50_000, 100_000, 200_000, 500_000, 1_000_000, 10_000_000],
			effect: [
				[1, 2, 3, 5, 10, 20, 25, 50, 100, 500],
				[1, 2, 5, 10, 15, 20, 25, 30, 40, 50]
			],
			level: status.upgrades.fish2
		}
	], [status]);

	return [upgrades];
}