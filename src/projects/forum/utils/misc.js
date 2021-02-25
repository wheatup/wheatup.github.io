import $$ from 'whi18n';

export const getTimeDiff = (target, origin = new Date()) => {
	if (typeof target === 'string') {
		target = new Date(target);
	}

	if (typeof origin === 'string') {
		origin = new Date(origin);
	}

	const timeDiff = Math.abs(origin.getTime() - target.getTime());
	const isBefore = origin.getTime() - target.getTime() < 0;

	if (timeDiff < 1000) {
		return $$`time-diff.just-now`;
	} else if (timeDiff < 60 * 1000) {
		const seconds = Math.floor(timeDiff / 1000);
		if(seconds === 1) {
			return $$('time-diff.second', seconds, isBefore ? $$`time-diff.before` : $$`time-diff.ago`);
		} else {
			return $$('time-diff.seconds', seconds, isBefore ? $$`time-diff.before` : $$`time-diff.ago`);
		}
	} else if (timeDiff < 60 * 60 * 1000) {
		const minutes = Math.floor(timeDiff / (60 * 1000));
		if(minutes === 1) {
			return $$('time-diff.minute', minutes, isBefore ? $$`time-diff.before` : $$`time-diff.ago`);
		} else {
			return $$('time-diff.minutes', minutes, isBefore ? $$`time-diff.before` : $$`time-diff.ago`);
		}
	} else if (timeDiff < 24 * 60 * 60 * 1000) {
		const hours = Math.floor(timeDiff / (60 * 60 * 1000));
		if(hours === 1) {
			return $$('time-diff.hour', hours, isBefore ? $$`time-diff.before` : $$`time-diff.ago`);
		} else {
			return $$('time-diff.hours', hours, isBefore ? $$`time-diff.before` : $$`time-diff.ago`);
		}
	} else if (timeDiff < 7 * 24 * 60 * 60 * 1000) {
		const days = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
		if(days === 1) {
			return $$('time-diff.day', days, isBefore ? $$`time-diff.before` : $$`time-diff.ago`);
		} else {
			return $$('time-diff.days', days, isBefore ? $$`time-diff.before` : $$`time-diff.ago`);
		}
	} else if (timeDiff < 30 * 24 * 60 * 60 * 1000) {
		const weeks = Math.floor(timeDiff / (7 * 24 * 60 * 60 * 1000));
		if(weeks === 1) {
			return $$('time-diff.week', weeks, isBefore ? $$`time-diff.before` : $$`time-diff.ago`);
		} else {
			return $$('time-diff.weeks', weeks, isBefore ? $$`time-diff.before` : $$`time-diff.ago`);
		}
	} else if (timeDiff < 365 * 30 * 24 * 60 * 60 * 1000) {
		const months = Math.floor(timeDiff / (30 * 24 * 60 * 60 * 1000));
		if(months === 1) {
			return $$('time-diff.month', months, isBefore ? $$`time-diff.before` : $$`time-diff.ago`);
		} else {
			return $$('time-diff.months', months, isBefore ? $$`time-diff.before` : $$`time-diff.ago`);
		}
	} else {
		const years = Math.floor(timeDiff / (365 * 24 * 60 * 60 * 1000))
		if(years === 1) {
			return $$('time-diff.year', years, isBefore ? $$`time-diff.before` : $$`time-diff.ago`);
		} else {
			return $$('time-diff.years', years, isBefore ? $$`time-diff.before` : $$`time-diff.ago`);
		}
	}
};

export default {
	getTimeDiff
};