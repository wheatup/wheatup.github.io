import { useCallback, useEffect, useMemo } from "react";
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
		cooldown = spawnInterval;
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
			for(let i = 0; i < rates.length; i++) {
				if(rnd < rates[i]) {
					fish = i;
					break;
				}
			}

			onSpawnFish(fish);
			resetCooldown();
		}
	});
}