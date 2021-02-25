import { init } from 'wherehouse';

export const LOADING = Symbol();
export const ME = Symbol();
export const LANG = Symbol();

export const setup = () => init({
	[LOADING]: '',
	[ME]: null,
	[LANG]: window.localStorage.getItem('lang') || 'zh-CN'
});