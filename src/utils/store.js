import { init } from 'wherehouse';

export const LOADING = Symbol();
export const ME = Symbol();
export const LANG = Symbol();
export const CV = Symbol();
export const IS_CV = Symbol();
export const FULLSCREEN = Symbol();
export const LANGUAGES = Symbol();

export const EmojiSpin = {
	COINS: Symbol(),
	DECK: Symbol(),
	SPIN_RESULT: Symbol(),
	DIMENTIONS: Symbol(),
	STATE: Symbol(),
};

export const Blog = {
	BLOGS: Symbol()
};

export const RegexDictionary = {
	WORDS: Symbol()
};

export const setup = () => init({
	[LOADING]: '',
	[ME]: null,
	[LANG]: window.localStorage.getItem('lang') || ({ en: 'en-US', 'en-BR': 'en-US', 'zh-CN': 'zh-CN', 'zh-TW': 'zh-CN' })[navigator.language] || 'en-US',
	[LANGUAGES]: ['en-US', 'zh-CN'],
	[CV]: !!window.localStorage.getItem('cv'),
	[IS_CV]: false,
	[FULLSCREEN]: false,

	[EmojiSpin.COINS]: 0,
	[EmojiSpin.DECK]: [],
	[EmojiSpin.DIMENTIONS]: [5, 5],
	[EmojiSpin.STATE]: 'IDLE',
	[EmojiSpin.SPIN_RESULT]: { cols: 5, rows: 5, columns: Array.from({ length: 5 }, (_, y) => ({ column: y, slots: Array.from({ length: 5 }, (_, x) => ({ column: y, row: x, slot: undefined })) }))},

	[Blog.BLOGS]: [],

	[RegexDictionary.WORDS]: [],
});