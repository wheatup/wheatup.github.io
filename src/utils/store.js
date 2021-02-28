import { init } from 'wherehouse';

export const LOADING = Symbol();
export const ME = Symbol();
export const LANG = Symbol();

export const setup = () => init({
	[LOADING]: '',
	[ME]: null,
	[LANG]: window.localStorage.getItem('lang') || ({ en: 'en-US', 'en-BR': 'en-US', 'zh-CN': 'zh-CN', 'zh-TW': 'zh-CN' })[navigator.language] || 'en-US'
});