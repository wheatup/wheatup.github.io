import { useCallback, useEffect, useMemo, useState } from "react";
import { setData, useData } from "wherehouse";
import { EmojiSpin } from "../../../../utils/store";

export const symbols = [
	{
		name: 'smile',
		emoji: '😀',
		rarity: 0,
		value: 1
	},
	{
		name: 'mushroom',
		emoji: '🍄',
		rarity: 0,
		value: 1
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
		desc: 'Give 2x🪙 for every adjacent 🍎'
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
							{ column: y, row: x, slot: symbols.find(({ name }) => n === name) }
						]
					};
				} else {
					columns[y].slots.push({ column: y, row: x, slot: symbols.find(({ name }) => n === name) });
				}
			}
		}

		const result = {
			cols,
			rows,
			columns
		};

		setData(EmojiSpin.SPIN_RESULT, result);
		return result;
	}, []);

	useEffect(() => {
		if (!deck.length) {
			setData(EmojiSpin.DECK, [
				'smile',
				'smile',
				'smile',
				'smile',
				'smile',
				'mushroom',
				'cherry',
				'cat',
				'coin',
			]);
		}
	}, [deck]);

	useEffect(() => {
		if(!initiated && deck.length) {
			spin(deck);
			initiated = true;
		}
	}, [spin, deck]);

	return { deck, result, spin };
};