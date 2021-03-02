import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { debounce, pinyin2num } from '../../utils/misc';
import { useDictionary } from './hooks/dictionary';
import { pinyin } from 'pinyin-pro';
import copy from 'copy-to-clipboard';

const Idioms = props => {
	const dictionary = useDictionary();

	const [options, setOptions] = useState({ pron: false, tone: false });
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);
	const parsedDictionary = useMemo(() => dictionary.map(entry => ({ ...entry, pinyin: pinyin2num(entry.pinyin) })), [dictionary]);

	const _search = useCallback((query, { pron, tone }, dict, setResults, setOptions) => {
		if (/^\w+$/[Symbol.match](query)) {
			// if(/\d$/[Symbol.match](query)) {
			// 	setOptions({ pron, tone: true });
			// } else {
			// 	setOptions({ pron: true, tone: false });
			// }
			if (tone && /\d$/[Symbol.match](query)) {
				setResults(dict.filter(({ pinyin }) => pinyin.split(' ')[0] === query));
			} else {
				setResults(dict.filter(({ pinyin }) => pinyin.split(' ')[0].replace(/\d+/g, '') === query.replace(/\d+/g, '')));
			}
		} else if(/^[\u4e00-\u9fa5]+$/[Symbol.match](query)) {
			const text = query[query.length - 1];
			if(pron) {
				const pys = pinyin(text, { toneType: 'num', multiple: true }).split(' ');
				if(tone) {
					setResults(dict.filter(({ pinyin }) => pys.some(py => py === pinyin.split(' ')[0])));
				} else {
					setResults(dict.filter(({ pinyin }) => pys.some(py => py.replace(/\d+/g, '') === pinyin.split(' ')[0].replace(/\d+/g, ''))));
				}
			} else {
				setResults(dict.filter(({ word }) => word[0] === text));
			}
		} else {
			setResults([]);
		}
	}, []);

	const search = useMemo(() => debounce(_search), [_search]);

	useEffect(() => {
		if (!dictionary?.length) return;

		if (/\s/[Symbol.match](query)) {
			setQuery(query.replace(/\s+/g, ''));
		}

		search(query, options, parsedDictionary, setResults, setOptions);
	}, [query, setQuery, options, parsedDictionary, setResults]);

	const onClickWord = useCallback(text => {
		copy(text);
		setQuery(text);
	}, [setQuery]);

	return (
		<div className="Idioms">
			<h1>成语接龙查询工具</h1>
			<input className="input" value={query} onChange={({ target: { value } }) => setQuery(value)} placeholder="输入成语、汉字或者拼音(yuan, san1)等..." />
			<div className="options">
				<div className="option-group">
					<input id="pron" name="pron" type="checkbox" checked={options.pron} onChange={({ target: { checked } }) => setOptions({ ...options, pron: checked })} />
					<label htmlFor="pron">同音字</label>
				</div>
				<div className={`option-group${options.pron ? '' : ' disabled'}`}>
					<input id="tone" name="tone" type="checkbox" checked={options.tone} onChange={({ target: { checked } }) => setOptions({ ...options, tone: checked })} />
					<label htmlFor="tone">同音调</label>
				</div>
			</div>
			<div className="results">
				{results.map(r => (
					<span onClick={() => onClickWord(r.word)}>{r.word}</span>
				))}
			</div>
		</div>
	);
};

export default Idioms;
