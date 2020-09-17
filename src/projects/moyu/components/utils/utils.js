export const numberer = num => {
	num = Math.ceil(num);
	
	if (num < 1000) {
		return num.toString();
	} else if (num < 1e6) {
		return (Math.floor(num *  1e-2) * 0.1).toLocaleString() + 'k';
	} else if (num < 1e9) {
		return (Math.floor(num *  1e-5) * 0.1).toLocaleString() + 'm';
	} else if (num < 1e12) {
		return (Math.floor(num *  1e-8) * 0.1).toLocaleString() + 'g';
	} else if (num < 1e15) {
		return (Math.floor(num *  1e-11) * 0.1).toLocaleString() + 't';
	} else if (num < 1e18) {
		return (Math.floor(num *  1e-14) * 0.1).toLocaleString() + 'p';
	} else if (num < 1e21) {
		return (Math.floor(num *  1e-17) * 0.1).toLocaleString() + 'e';
	} else if (num < 1e24) {
		return (Math.floor(num *  1e-20) * 0.1).toLocaleString() + 'z';
	} else if (num < 1e27) {
		return (Math.floor(num *  1e-23) * 0.1).toLocaleString() + 'y';
	} else {
		return 'MAX';
	}
}