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
			fish3: 0,
		},
		misc: {
			fishTankSize: 0,
			spawnRate: 0,
		}
	}
});