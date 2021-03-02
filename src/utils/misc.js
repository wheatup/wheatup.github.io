export const debounce = (fn, delay = 150, thisArg) => {
	let timer;
	return (...args) => {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => thisArg ? fn.call(thisArg, ...args) : fn(...args), delay);
	};
}

export const pinyin2num = txt => {
	return txt.split(' ').map(e => {
		if (/[āōēīūǖ]/[Symbol.match](e)) {
			return e.replace(/[āēīūǖō]/, i => ({ 'ā': 'a', 'ō': 'o', 'ē': 'e', 'ī': 'i', 'ū': 'u', 'ǖ': 'v' })[i]) + '1';
		} else if (/[áóéńíúǘ]/[Symbol.match](e)) {
			return e.replace(/[áóéńíúǘ]/, i => ({ 'á': 'a', 'ó': 'o', 'é': 'e', 'ń': 'n', 'í': 'i', 'ú': 'u', 'ǘ': 'v', '': 'm' })[i]) + '2';
		} else if (/[ǎǒěňǐǔǚ]/[Symbol.match](e)) {
			return e.replace(/[ǎǒěňǐǔǚ]/, i => ({ 'ǎ': 'a', 'ǒ': 'o', 'ě': 'e', 'ň': 'n', 'ǐ': 'i', 'ǔ': 'u', 'ǚ': 'v' })[i]) + '3';
		} else if (/[àòèìùǜ]/[Symbol.match](e)) {
			return e.replace(/[àòèìùǜ]/, i => ({ 'à': 'a', 'ò': 'o', 'è': 'e', '': 'n', 'ì': 'i', 'ù': 'u', 'ǜ': 'v' })[i]) + '4';
		}
	}).join(' ');
}