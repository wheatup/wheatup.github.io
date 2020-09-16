import { init } from 'wherehouse';

export const LOADING = Symbol();
export const ME = Symbol();

export const FISH = Symbol();
export const UPGRADES = Symbol();

export const setup = () => init({
	[LOADING]: '',
	[ME]: null,

	[FISH]: 0,
	[UPGRADES]: {
		fish: {
			fish1: 0,
			fish2: 0,
		},
		misc: {
			fishTankSize: 0
		}
		
		// maxFish: 10,
		// spawnInterval: 1000,
		// spawnRate: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
		// tierScores: [1, 3, 10, 20, 50, 100, 1000, 5000, 10000, 100000],
		// tierMultipliers: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		// upgrades: {
		// 	fish1: 0
		// }
	}
});