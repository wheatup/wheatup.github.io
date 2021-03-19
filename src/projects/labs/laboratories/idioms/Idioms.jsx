import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { debounce } from '../../../../utils/misc';
import { useDictionary } from './hooks/dictionary';
import { pinyin } from 'pinyin-pro';
import copy from 'copy-to-clipboard';
import { useHistory } from 'react-router-dom';
import { useTitle } from '../../../../hooks/misc';
import $$ from 'whi18n';

const Idioms = ({ location }) => {
	const dictionary = useDictionary();
	const history = useHistory();
	useTitle($$`_idioms.title`);

	const [shouldUpdate, setShouldUpdate] = useState(false);

	const searchString = new URLSearchParams(location?.search ?? '');
	let q = decodeURI(searchString.get('q') || '');
	let pron = !!+decodeURI(searchString.get('pron') || '0');
	let tone = !!+decodeURI(searchString.get('tone') || '0');
	let initial = !!+decodeURI(searchString.get('initial') || '1');

	const [options, setOptions] = useState({ pron: !!+pron, tone: !!+tone, initial: !!+initial });
	const [query, setQuery] = useState(q);
	const [results, setResults] = useState([]);

	const search = useMemo(() => debounce(() => setShouldUpdate(true), 200), [setShouldUpdate]);

	useEffect(() => {
		const searchString = new URLSearchParams(location?.search ?? '');
		q = decodeURI(searchString.get('q') || '');
		pron = !!+decodeURI(searchString.get('pron') || '0');
		tone = !!+decodeURI(searchString.get('tone') || '0');
		initial = !!+decodeURI(searchString.get('initial') || '1');

		setOptions({ pron, tone, initial });
		setQuery(q);

		if (/^\w+$/[Symbol.match](q)) {
			if (tone && /\d$/[Symbol.match](q)) {
				if (initial) {
					setResults(dictionary.filter(({ pinyin }) => pinyin.split(' ')[0] === q));
				} else {
					setResults(dictionary.filter(({ pinyin }) => pinyin.split(' ').some(t => t === q)));
				}
			} else {
				if (initial) {
					setResults(dictionary.filter(({ pinyin }) => pinyin.split(' ')[0].replace(/\d+/g, '') === q.replace(/\d+/g, '')));
				} else {
					setResults(dictionary.filter(({ pinyin }) => pinyin.split(' ').some(t => t.replace(/\d+/g, '') === q.replace(/\d+/g, ''))));
				}
			}
		} else if (/^[\u4e00-\u9fa5，]+$/[Symbol.match](q)) {
			const text = q[q.length - 1];
			if (pron) {
				let pys = pinyin(text, { toneType: 'num', multiple: true }).split(' ');
				if (tone) {
					if (initial) {
						setResults(dictionary.filter(({ pinyin }) => pys.some(py => py === pinyin.split(' ')[0])));
					} else {
						pys = [...q].map(e => pinyin(e, { toneType: 'num', multiple: true }).split(' '));
						setResults(dictionary.filter(({ pinyin }) => pys.every(py1 => py1.some(py => pinyin.split(' ').some(t => t === py)))));
					}
				} else {
					if (initial) {
						setResults(dictionary.filter(({ pinyin }) => pys.some(py => py.replace(/\d+/g, '') === pinyin.split(' ')[0].replace(/\d+/g, ''))));
					} else {
						pys = [...q].map(e => pinyin(e, { toneType: 'num', multiple: true }).split(' '));
						setResults(dictionary.filter(({ pinyin }) => pys.every(py1 => py1.some(py => pinyin.split(' ').some(t => t.replace(/\d+/g, '') === py.replace(/\d+/g, ''))))));
					}
				}
			} else {
				if (initial) {
					setResults(dictionary.filter(({ word }) => word[0] === text));
				} else {
					setResults(dictionary.filter(({ word }) => [...q].every(e => word.includes(e))));
				}
			}
		} else {
			setResults([]);
		}
	}, [location, history, dictionary]);

	useEffect(() => {
		if (!shouldUpdate) return;
		setShouldUpdate(false);

		console.log('update');

		history.push(location.pathname + `?q=${encodeURI(query)}&initial=${+options.initial}&pron=${+options.pron}&tone=${+options.tone}`);
	}, [shouldUpdate, options, setResults, dictionary, location]);

	useEffect(() => {
		if (!dictionary?.length) return;

		if (/\s/[Symbol.match](query)) {
			setQuery(query.replace(/\s+/g, ''));
		}

		search();
	}, [query, setQuery, options, dictionary, setResults]);

	const onClickWord = useCallback(
		text => {
			copy(text);
			setQuery(text);
		},
		[setQuery]
	);

	return (
		<div className="Idioms">
			<h1>{$$`_idioms.title`}</h1>
			<input className="input" autoComplete={false} disabled={dictionary.length === 0} value={query} onChange={({ target: { value } }) => setQuery(value.toLowerCase())} placeholder={$$`_idioms.placeholder`} />
			<div className="options">
				<div className={`option-group`}>
					<input id="initial" name="initial" type="checkbox" checked={options.initial} onChange={({ target: { checked } }) => setOptions({ ...options, initial: checked })} />
					<label htmlFor="initial">{$$`_idioms.initial`}</label>
				</div>
				<div className="option-group">
					<input
						id="pron"
						name="pron"
						type="checkbox"
						checked={options.pron}
						onChange={({ target: { checked } }) => {
							if (!checked) {
								setOptions({ ...options, pron: false, tone: false });
							} else {
								setOptions({ ...options, pron: checked });
							}
						}}
					/>
					<label htmlFor="pron">{$$`_idioms.homophone`}</label>
				</div>
				<div className={`option-group${options.pron ? '' : ' disabled'}`}>
					<input
						id="tone"
						name="tone"
						type="checkbox"
						checked={options.tone}
						onChange={({ target: { checked } }) => {
							if (checked) {
								setOptions({ ...options, pron: true, tone: true });
							} else {
								setOptions({ ...options, tone: checked });
							}
						}}
					/>
					<label htmlFor="tone">{$$`_idioms.tone`}</label>
				</div>
			</div>
			<div className="results">
				{results.map(r => (
					<span key={r.word} onClick={() => onClickWord(r.word)}>
						{r.word}
					</span>
				))}
			</div>
		</div>
	);
};

export default Idioms;
