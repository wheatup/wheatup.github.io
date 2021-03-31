import { useCallback, useEffect } from "react";
import { setData, useData } from "wherehouse";
import whevent from "whevent";
import { EmojiSpin } from "../../../../utils/store";

export const empty = {
	name: 'empty',
	rarity: 0,
	value: 0
};

export const symbols = [
	{
		name: 'smile',
		emoji: '😀',
		rarity: 0,
		value: 1,
		affect(result, source, target, score, boosters) {
			// console.log({ result, source, target, score, boosters });
		}
	},
	{
		name: 'mushroom',
		emoji: '🍄',
		rarity: 0,
		value: 1,
	},
	{
		name: 'coin',
		emoji: '🪙',
		rarity: 0,
		value: 1
	},

	{
		name: 'cat',
		emoji: '🐱',
		rarity: 0,
		value: 1
	},

	{
		name: 'cherry',
		emoji: '🍒',
		rarity: 0,
		value: 1,
		desc: 'Give +1🪙 for every adjacent 🍒'
	}, {
		name: 'apple',
		emoji: '🍎',
		rarity: 0,
		value: 1,
		desc: 'Give +1🪙 for every adjacent 🍎'
	}, {
		name: 'orange',
		emoji: '🍊',
		rarity: 1,
		value: 2
	}, {
		name: 'lemon',
		emoji: '🍋',
		rarity: 1,
		value: 3
	}, {
		name: 'watermelon',
		emoji: '🍉',
		rarity: 2,
		value: 5
	},
];

let initiated = false;
export const useDeck = () => {
	const deck = useData(EmojiSpin.DECK);
	const result = useData(EmojiSpin.SPIN_RESULT);

	const spin = useCallback((deck, cols = 5, rows = 5) => {
		const shuffledDeck = [...deck];
		shuffledDeck.sort(() => Math.random() > 0.5 ? -1 : 1);
		if (shuffledDeck.length > cols * rows) {
			shuffledDeck.splice(cols * rows);
		} else {
			for (let i = shuffledDeck.length; i < cols * rows; i++) {
				shuffledDeck.push(null);
			}
			shuffledDeck.sort(() => Math.random() > 0.5 ? -1 : 1);
		}

		const columns = [];

		for (let y = 0; y < cols; y++) {
			for (let x = 0; x < rows; x++) {
				const n = shuffledDeck[y * rows + x];
				if (x === 0) {
					columns[y] = {
						column: y,
						slots: [
							{ column: y, row: x, slot: symbols.find(({ name }) => n === name) || empty }
						]
					};
				} else {
					columns[y].slots.push({ column: y, row: x, slot: symbols.find(({ name }) => n === name) || empty });
				}
			}
		}

		const result = {
			cols,
			rows,
			columns,
			toString() {
				const rows = new Array(this.rows).fill('');
				this.columns.forEach(({ slots }) => {
					slots.forEach(({ row, slot }) => {
						rows[row] += (slot.emoji || 'X') + '\t';
					})
				})
				return rows.join('\n');
			}
		};

		console.log('%cRESULT', 'background-color: gold; color: #630; padding: 5px 10px; border-radius: 10px;', result);
		console.log(result.toString());
		setData(EmojiSpin.SPIN_RESULT, result);
		return result;
	}, []);

	useEffect(() => {
		if (!deck.length) {
			setData(EmojiSpin.DECK, [
				'smile',
				'mushroom',
				'cherry',
				'cat',
				'coin',
			]);
		}
	}, [deck]);

	useEffect(() => {
		if (!initiated && deck.length) {
			spin(deck);
			initiated = true;
		}
	}, [spin, deck]);

	return { deck, result, spin };
};

export const calculateSlot = (result, target) => {
	const { column, row, slot } = target;
	let res = { base: 0, add: 0, mul: 1 };
	let boosters = [];

	if (slot) {
		if (typeof slot.value === 'function') {
			slot.value(res);
		} else {
			res.base = slot.value || 0;
		}
	}

	for (let c = 0; c < result.cols; c++) {
		for (let r = 0; r < result.rows; r++) {
			if (c !== column || r !== row) {
				const source = result.columns[c].slots[r];
				if (source.slot.affect) {
					source.slot.affect(result, source, target, res, boosters);
				}
			}
		}
	}

	const value = (res.base + res.add) * res.mul || 0;
	return { value, boosters };
};