import { init } from 'wherehouse';

export const LOADING = Symbol();
export const ME = Symbol();

export const FISH = Symbol();
export const UPGRADES = Symbol();

export const setup = () => init({
	[LOADING]: '',
	[ME]: null,

	[FISH]: 2000006,
	[UPGRADES]: {
		fish: {
			fish1: 2,
			fish2: 0,
			fish3: 0,
			fish4: 0,
			fish5: 0,
			fish6: 0,
			fish7: 0,
			fish8: 0,
			fish9: 0,
			fish10: 0
		},
		misc: {
			fishMultiplier: 0,
			fishTankSize: 0,
			spawnRate: 0,
		}
	}
});