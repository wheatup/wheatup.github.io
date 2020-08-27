import { init } from 'wherehouse';

export const LOADING = Symbol();
export const ME = Symbol();

export const setup = () => init({
	[LOADING]: '',
	[ME]: null
});