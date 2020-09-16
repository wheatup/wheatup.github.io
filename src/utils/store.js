import { init } from 'wherehouse';

export const LOADING = Symbol();
export const ME = Symbol();

export const FISH = Symbol();
export const FISH_STATUS = Symbol();

export const setup = () => init({
	[LOADING]: '',
	[ME]: null,

	[FISH]: 42,
	[FISH_STATUS]: {
		spawnInterval: 5000,
		spawnRate: [10, 5]
	}
});