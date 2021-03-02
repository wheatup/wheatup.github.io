import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { debounce, pinyin2num } from '../../utils/misc';
import { useDictionary } from './hooks/dictionary';
import { pinyin } from 'pinyin-pro';
import copy from 'copy-to-clipboard';
import { useHistory } from 'react-router-dom';

const Idioms = ({ location }) => {
	const dictionary = useDictionary();
	const history = useHistory();

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
		console.log('aaa');

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
				const pys = pinyin(text, { toneType: 'num', multiple: true }).split(' ');
				if (tone) {
					if (initial) {
						setResults(dictionary.filter(({ pinyin }) => pys.some(py => py === pinyin.split(' ')[0])));
					} else {
						setResults(dictionary.filter(({ pinyin }) => pys.some(py => pinyin.split(' ').some(t => t === py))));
					}
				} else {
					if (initial) {
						setResults(dictionary.filter(({ pinyin }) => pys.some(py => py.replace(/\d+/g, '') === pinyin.split(' ')[0].replace(/\d+/g, ''))));
					} else {
						setResults(dictionary.filter(({ pinyin }) => pys.some(py => pinyin.split(' ').some(t => t.replace(/\d+/g, '') === py.replace(/\d+/g, '')))));
					}
				}
			} else {
				if (initial) {
					setResults(dictionary.filter(({ word }) => word[0] === text));
				} else {
					setResults(dictionary.filter(({ word }) => [...word].some(t => t === text)));
				}
			}
		} else {
			setResults([]);
		}
	}, [location, history, dictionary])

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

	const onClickWord = useCallback(text => {
		copy(text);
		setQuery(text);
	}, [setQuery]);

	return (
		<div className="Idioms">
			<h1>成语接龙查询工具</h1>
			<input className="input" disabled={dictionary.length === 0} value={query} onChange={({ target: { value } }) => setQuery(value)} placeholder="输入成语、汉字或者拼音(yuan, san1)等..." />
			<div className="options">
				<div className={`option-group`}>
					<input id="initial" name="initial" type="checkbox" checked={options.initial} onChange={({ target: { checked } }) => setOptions({ ...options, initial: checked })} />
					<label htmlFor="initial">首字</label>
				</div>
				<div className="option-group">
					<input id="pron" name="pron" type="checkbox" checked={options.pron} onChange={({ target: { checked } }) => {
						if (!checked) {
							setOptions({ ...options, pron: false, tone: false })
						} else {
							setOptions({ ...options, pron: checked })
						}
					}} />
					<label htmlFor="pron">同音字</label>
				</div>
				<div className={`option-group${options.pron ? '' : ' disabled'}`}>
					<input id="tone" name="tone" type="checkbox" checked={options.tone} onChange={({ target: { checked } }) => {
						if (checked) {
							setOptions({ ...options, pron: true, tone: true })
						} else {
							setOptions({ ...options, tone: checked })
						}
					}} />
					<label htmlFor="tone">同音调</label>
				</div>
			</div>
			<div className="results">
				{results.map(r => (
					<span key={r.word} onClick={() => onClickWord(r.word)}>{r.word}</span>
				))}
			</div>
		</div>
	);
};

export default Idioms;
