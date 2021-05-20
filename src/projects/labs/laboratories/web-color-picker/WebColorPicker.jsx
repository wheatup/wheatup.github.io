import React, { useState } from 'react';
import { useTitle } from '../../../../hooks/misc';
import { ChromePicker } from 'react-color';
import { useMemo } from 'react';
import copy from 'copy-to-clipboard';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import $$ from 'whi18n';

const webColors = {
	aliceblue: '#f0f8ff',
	antiquewhite: '#faebd7',
	aqua: '#00ffff',
	aquamarine: '#7fffd4',
	azure: '#f0ffff',
	beige: '#f5f5dc',
	bisque: '#ffe4c4',
	black: '#000000',
	blanchedalmond: '#ffebcd',
	blue: '#0000ff',
	blueviolet: '#8a2be2',
	brown: '#a52a2a',
	burlywood: '#deb887',
	cadetblue: '#5f9ea0',
	chartreuse: '#7fff00',
	chocolate: '#d2691e',
	coral: '#ff7f50',
	cornflowerblue: '#6495ed',
	cornsilk: '#fff8dc',
	crimson: '#dc143c',
	cyan: '#00ffff',
	darkblue: '#00008b',
	darkcyan: '#008b8b',
	darkgoldenrod: '#b8860b',
	darkgray: '#a9a9a9',
	darkgreen: '#006400',
	// darkgrey: '#a9a9a9',
	darkkhaki: '#bdb76b',
	darkmagenta: '#8b008b',
	darkolivegreen: '#556b2f',
	darkorange: '#ff8c00',
	darkorchid: '#9932cc',
	darkred: '#8b0000',
	darksalmon: '#e9967a',
	darkseagreen: '#8fbc8f',
	darkslateblue: '#483d8b',
	darkslategray: '#2f4f4f',
	// darkslategrey: '#2f4f4f',
	darkturquoise: '#00ced1',
	darkviolet: '#9400d3',
	deeppink: '#ff1493',
	deepskyblue: '#00bfff',
	dimgray: '#696969',
	// dimgrey: '#696969',
	dodgerblue: '#1e90ff',
	firebrick: '#b22222',
	floralwhite: '#fffaf0',
	forestgreen: '#228b22',
	fuchsia: '#ff00ff',
	gainsboro: '#dcdcdc',
	ghostwhite: '#f8f8ff',
	goldenrod: '#daa520',
	gold: '#ffd700',
	gray: '#808080',
	green: '#008000',
	greenyellow: '#adff2f',
	// grey: '#808080',
	honeydew: '#f0fff0',
	hotpink: '#ff69b4',
	indianred: '#cd5c5c',
	indigo: '#4b0082',
	ivory: '#fffff0',
	khaki: '#f0e68c',
	lavenderblush: '#fff0f5',
	lavender: '#e6e6fa',
	lawngreen: '#7cfc00',
	lemonchiffon: '#fffacd',
	lightblue: '#add8e6',
	lightcoral: '#f08080',
	lightcyan: '#e0ffff',
	lightgoldenrodyellow: '#fafad2',
	lightgray: '#d3d3d3',
	lightgreen: '#90ee90',
	// lightgrey: '#d3d3d3',
	lightpink: '#ffb6c1',
	lightsalmon: '#ffa07a',
	lightseagreen: '#20b2aa',
	lightskyblue: '#87cefa',
	lightslategray: '#778899',
	// lightslategrey: '#778899',
	lightsteelblue: '#b0c4de',
	lightyellow: '#ffffe0',
	lime: '#00ff00',
	limegreen: '#32cd32',
	linen: '#faf0e6',
	magenta: '#ff00ff',
	maroon: '#800000',
	mediumaquamarine: '#66cdaa',
	mediumblue: '#0000cd',
	mediumorchid: '#ba55d3',
	mediumpurple: '#9370db',
	mediumseagreen: '#3cb371',
	mediumslateblue: '#7b68ee',
	mediumspringgreen: '#00fa9a',
	mediumturquoise: '#48d1cc',
	mediumvioletred: '#c71585',
	midnightblue: '#191970',
	mintcream: '#f5fffa',
	mistyrose: '#ffe4e1',
	moccasin: '#ffe4b5',
	navajowhite: '#ffdead',
	navy: '#000080',
	oldlace: '#fdf5e6',
	olive: '#808000',
	olivedrab: '#6b8e23',
	orange: '#ffa500',
	orangered: '#ff4500',
	orchid: '#da70d6',
	palegoldenrod: '#eee8aa',
	palegreen: '#98fb98',
	paleturquoise: '#afeeee',
	palevioletred: '#db7093',
	papayawhip: '#ffefd5',
	peachpuff: '#ffdab9',
	peru: '#cd853f',
	pink: '#ffc0cb',
	plum: '#dda0dd',
	powderblue: '#b0e0e6',
	purple: '#800080',
	rebeccapurple: '#663399',
	red: '#ff0000',
	rosybrown: '#bc8f8f',
	royalblue: '#4169e1',
	saddlebrown: '#8b4513',
	salmon: '#fa8072',
	sandybrown: '#f4a460',
	seagreen: '#2e8b57',
	seashell: '#fff5ee',
	sienna: '#a0522d',
	silver: '#c0c0c0',
	skyblue: '#87ceeb',
	slateblue: '#6a5acd',
	slategray: '#708090',
	// slategrey: '#708090',
	snow: '#fffafa',
	springgreen: '#00ff7f',
	steelblue: '#4682b4',
	tan: '#d2b48c',
	teal: '#008080',
	thistle: '#d8bfd8',
	tomato: '#ff6347',
	turquoise: '#40e0d0',
	violet: '#ee82ee',
	wheat: '#f5deb3',
	white: '#ffffff',
	whitesmoke: '#f5f5f5',
	yellow: '#ffff00',
	yellowgreen: '#9acd32'
};

const getRGB = hex => {
	const [_, r, g, b] = /([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/[Symbol.match](hex);
	return [parseInt(r, 16) / 255, parseInt(g, 16) / 255, parseInt(b, 16) / 255];
};

const webColorRGBs = Object.fromEntries(
	Object.entries(webColors).map(([key, value]) => {
		const [r, g, b] = getRGB(value);
		return [key, [r, g, b]];
	})
);

function rgbToHsl([r, g, b]) {
	let max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	let h,
		s,
		l = (max + min) / 2;

	if (max == min) {
		h = s = 0; // achromatic
	} else {
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}

		h /= 6;
	}

	return [h, s, l];
}

function easeInOutCubic(x) {
	return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

const WebColorPicker = props => {
	useTitle($$`_web-color-picker.title`);
	const [color, setColor] = useState('#ff0000');

	const brightness = useMemo(() => {
		const [r, g, b] = getRGB(color);
		return (0.299 * r ** 2 + 0.587 * g ** 2 + 0.114 * b ** 2) ** 0.5;
	}, [color]);

	const webColors = useMemo(() => {
		let mins = [
			{ dist: Infinity, color: 'N/A' },
			// { dist: Infinity, color: 'N/A' },
			// { dist: Infinity, color: 'N/A' }
		];
		const [orgH, orgS, orgL] = rgbToHsl(getRGB(color));
		console.log({ orgH, orgS, orgL });
		Object.entries(webColorRGBs).forEach(([key, [r, g, b]]) => {
			const [h, s, l] = rgbToHsl([r, g, b]);
			let distH = easeInOutCubic(Math.min(Math.abs(orgH - h), 1 - Math.abs(orgH - h)) * 2);
			let distS = easeInOutCubic(Math.abs(orgS - s));
			let distL = easeInOutCubic(Math.abs(orgL - l));
			distS *= l ** 0.2;
			distH *= s ** 0.2;
			distL *= 0.5;
			const dist = (distH + distS + distL) ** 0.5;
			for (let i = 0; i < mins.length; i++) {
				let min = mins[i];
				if (dist < min.dist) {
					for (let j = mins.length - 1; j < i; j--) {
						mins[j] = mins[j - 1];
					}
					mins[i] = { dist, color: key };
					break;
				}
			}
		});
		return mins.map(({ color }) => color);
	}, [color]);

	const onClickColor = useCallback(color => {
		copy(color);
		toast($$`_web-color-picker.copied`);
	}, []);

	return (
		<section className="WebColorPicker">
			<h2>{$$`_web-color-picker.title`}</h2>
			<ChromePicker color={color} onChange={({ hex }) => setColor(hex)} disableAlpha={true} />
			<div className="comparison">
				<div className="block origin">
					<div className="color" onClick={() => onClickColor(color)} style={{ backgroundColor: color, color: brightness > 0.5 ? 'black' : 'white' }}>
						<span style={{ opacity: 0.5 }}>{color}</span>
					</div>
				</div>
				<div className="block web">
					{webColors.map(color => (
						<div key={color} onClick={() => onClickColor(color)} className="color" style={{ backgroundColor: color, color: brightness > 0.5 ? 'black' : 'white' }}>
							<span style={{ opacity: 0.5 }}>{color}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default WebColorPicker;
