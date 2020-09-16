import { init } from 'wherehouse';

export const LOADING = Symbol();
export const ME = Symbol();

export const FISH = Symbol();
export const FISH_STATUS = Symbol();

export const setup = () => init({
	[LOADING]: '',
	[ME]: null,

	[FISH]: 0,
	[FISH_STATUS]: {
		maxFish: 20,
		spawnInterval: 1000,
		spawnRate: [10, 5],
		tierScores: [1, 3, 10, 20, 50, 100, 1000, 5000, 10000, 100000],
		tierMultipliers: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	}
});