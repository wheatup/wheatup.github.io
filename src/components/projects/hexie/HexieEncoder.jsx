import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Button from '../../common/Button';
import { encode, decode } from 'hexie-encode';
import { useHistory } from 'react-router-dom';

const HexieEncoder = ({ location }) => {
	const [input, setInput] = useState('');
	const [customDict, setCustomDict] = useState('');
	const [output, setOutput] = useState('');
	const history = useHistory();

	const search = new URLSearchParams(location?.search ?? '');
	const act = search.get('act') || 'decode';
	const dict = decodeURI(search.get('dict') || '');
	const txt = decodeURI(search.get('txt') || '');

	const dictArr = useMemo(() => {
		const d = customDict || dict;
		if (d) {
			return d.split(/[,，]/).map(e => e.trim());
		}
	}, [customDict, dict]);

	const onClickEncode = useCallback(() => {
		history.replace(location.pathname + '?' + ('act=encode') + (customDict ? `&dict=${encodeURI(customDict)}` : '') + (input ? `&txt=${encodeURI(input)}` : ''));
	}, [input, dictArr, setOutput]);

	const onClickDecode = useCallback(() => {
		history.replace(location.pathname + '?' + ('act=decode') + (customDict ? `&dict=${encodeURI(customDict)}` : '') + (input ? `&txt=${encodeURI(input)}` : ''));
	}, [input, dictArr, setOutput]);

	const doEncode = useCallback((txt, dict) => {
		try {
			const result = dict && dict.length > 2 ? encode(txt, dict) : encode(txt);
			setOutput(result);
		} catch (ex) {
			setOutput('');
		}
	}, [input, dictArr, setOutput]);

	const doDecode = useCallback((txt, dict) => {
		console.log('decode', txt);
		try {
			const result = dict && dict.length > 2 ? decode(txt, dict) : decode(txt);
			setOutput(result);
		} catch (ex) {
			setOutput('');
		}
	}, [input, dictArr, setOutput]);


	useEffect(() => {
		if (txt) {
			setInput(txt);
		}

		if (dict) {
			setCustomDict(dict);
		}

		if (act) {
			if (act === 'decode') {
				doDecode(txt, dictArr);
			} else {
				doEncode(txt, dictArr);
			}
		}
	}, [act, txt, dict]);

	return (
		<div className="HexieEncoder">
			<h1>和谐加密器</h1>
			<textarea onChange={({ target: { value } }) => {
				setOutput('');
				setInput(value);
			}} value={input}></textarea>
			<div className="button-area">
				<Button onClick={onClickEncode}>加密</Button>
				<Button onClick={onClickDecode}>解密</Button>
			</div>
			<textarea value={output} readOnly={true}></textarea>
			<h2>自定义字典</h2>
			<input type="text" placeholder="富强,民主,文明,和谐,自由,平等,公正,法治,爱国,敬业,诚信,友善" onChange={({ target: { value } }) => {
				setOutput('');
				setCustomDict(value);
			}} value={customDict} />
		</div>
	);
}

export default HexieEncoder;