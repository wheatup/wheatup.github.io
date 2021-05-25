import React, { useEffect, useState, useRef } from 'react';
import { useWords } from './hooks/regexDictionary';
import ContentEditable from 'react-contenteditable';
import useDebouncedEffect from 'use-debounced-effect';
import $$ from 'whi18n';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import copy from 'copy-to-clipboard';

const RegexDictionary = props => {
	const words = useWords();

	const [regex, setRegex] = useState('');
	const [illegal, setIllegal] = useState(false);
	const [overflow, setOverflow] = useState(false);
	const regexRef = useRef('');
	const [options, setOptions] = useState({ anchored: true });
	const [filteredWords, setFilteredWords] = useState([]);

	useDebouncedEffect(
		() => {
			if (!words.length || !regex) return;

			try {
				const regexStr = (options.anchored ? '^' : '') + regex + (options.anchored ? '$' : '');
				const regexp = new RegExp(regexStr, 'i');
				console.log(regexp);
				let count = 0;
				const filtered = words.filter(e => {
					if (count >= 1000) {
						count == 1000 && setOverflow(true);
						return false;
					}

					const result = regexp.test(e);
					if (result) {
						count++;
					}

					return result;
				});
				setFilteredWords(filtered);
			} catch (ex) {
				setIllegal(true);
			}
		},
		1000,
		[regex, words, options]
	);

	const copyWord = useCallback(word => {
		copy(word);
		toast($$`_regex-dictionary.copied`);
	});

	return (
		<section className="RegexDictionary">
			<h2>{$$`_regex-dictionary.title`}</h2>
			<div className={`input-area${options.anchored ? ' anchored' : ''}${illegal ? ' illegal' : ''}`}>
				<ContentEditable
					html={regexRef.current}
					className="input"
					onBlur={() => {
						console.log(regexRef.current);
					}}
					onChange={({ target }) => {
						setIllegal(false);
						regexRef.current = target.value;
						setRegex(target.value);
					}}
				/>
			</div>
			<div className="options">
				<div className="option-group">
					<input
						id="anchored"
						name="anchored"
						type="checkbox"
						checked={options.anchored}
						onChange={({ target: { checked } }) => {
							console.log(checked);
							setOptions({ ...options, anchored: !!checked });
						}}
					/>
					<label htmlFor="anchored">{$$`_regex-dictionary.anchored`}</label>
				</div>
			</div>

			<div className="result">
				{filteredWords.length ? (
					<div className="wrapper">
						{filteredWords.map(word => (
							<span onClick={() => copyWord(word)} key={word}>
								{word}
							</span>
						))}
					</div>
				) : illegal ? (
					<p>{$$`_regex-dictionary.illegal`}</p>
				) : (
					<p>{$$`_regex-dictionary.no-results`}</p>
				)}
			</div>
		</section>
	);
};

export default RegexDictionary;
