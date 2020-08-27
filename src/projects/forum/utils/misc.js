export const getTimeDiff = (target, origin = new Date()) => {
	if (typeof target === 'string') {
		target = new Date(target);
	}

	if (typeof origin === 'string') {
		origin = new Date(origin);
	}

	const timeDiff = Math.abs(origin.getTime() - target.getTime());
	const isBefore = origin.getTime() - target.getTime() > 0;

	if (timeDiff < 1000) {
		return '刚刚';
	} else if (timeDiff < 60 * 1000) {
		return Math.floor(timeDiff / 1000) + `秒${isBefore ? '前' : '后'}`;
	} else if (timeDiff < 60 * 60 * 1000) {
		return Math.floor(timeDiff / (60 * 1000)) + `分钟${isBefore ? '前' : '后'}`;
	} else if (timeDiff < 24 * 60 * 60 * 1000) {
		return Math.floor(timeDiff / (60 * 60 * 1000)) + `小时${isBefore ? '前' : '后'}`;
	} else if (timeDiff < 7 * 24 * 60 * 60 * 1000) {
		return Math.floor(timeDiff / (24 * 60 * 60 * 1000)) + `天${isBefore ? '前' : '后'}`;
	} else if (timeDiff < 30 * 24 * 60 * 60 * 1000) {
		return Math.floor(timeDiff / (7 * 24 * 60 * 60 * 1000)) + `周${isBefore ? '前' : '后'}`;
	} else if (timeDiff < 365 * 30 * 24 * 60 * 60 * 1000) {
		return Math.floor(timeDiff / (30 * 24 * 60 * 60 * 1000)) + `个月${isBefore ? '前' : '后'}`;
	} else {
		return Math.floor(timeDiff / (365 * 24 * 60 * 60 * 1000)) + `年${isBefore ? '前' : '后'}`;
	}
};

export default {
	getTimeDiff
};