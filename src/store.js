import { init as _init } from 'wherehouse';

export const VERSION = Symbol();

export const init = () => {
	_init({
		[VERSION]: '1.0'
	});
};