import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import Button from '../../components/common/Button';
import { encode, decode } from 'hexie-encode';
import { useHistory } from 'react-router-dom';
import { useTitle } from '../../hooks/misc';
import $$ from 'whi18n';

const HexieEncoder = ({ location }) => {
	useTitle($$`hexie-encoder`);

	const [input, setInput] = useState('');
	const [customDict, setCustomDict] = useState('');
	const [output, setOutput] = useState('');
	const [copied, setCopied] = useState(false);
	const history = useHistory();
	const outputComp = useRef(null);
	const inputComp = useRef(null);

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
		history.replace(location.pathname + '?act=encode' + (customDict ? `&dict=${encodeURI(customDict)}` : '') + (input ? `&txt=${encodeURI(input)}` : ''));
	}, [input, customDict, history, location]);

	const onClickDecode = useCallback(() => {
		history.replace(location.pathname + '?act=decode' + (customDict ? `&dict=${encodeURI(customDict)}` : '') + (input ? `&txt=${encodeURI(input)}` : ''));
	}, [input, customDict, history, location]);

	const doEncode = useCallback(
		(txt, dict) => {
			try {
				const result = dict && dict.length > 2 ? encode(txt, dict) : encode(txt);
				setOutput(result);
			} catch (ex) {
				setOutput('');
			}
		},
		[setOutput]
	);

	const doDecode = useCallback(
		(txt, dict) => {
			try {
				const result = dict && dict.length > 2 ? decode(txt, dict) : decode(txt);
				setOutput(result);
			} catch (ex) {
				setOutput('');
			}
		},
		[setOutput]
	);

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

	const onClickOutput = useCallback(() => {
		outputComp.current.select();
		outputComp.current.setSelectionRange(0, 999999);
		document.execCommand('copy');
		setCopied(true);

		setTimeout(() => setCopied(false), 700);
	}, [output, outputComp]);

	const onFocusInput = useCallback(() => {
		inputComp.current.select();
		inputComp.current.setSelectionRange(0, 999999);
	}, [inputComp]);

	return (
		<div className="HexieEncoder">
			<h1>{$$`hexie-encoder`}</h1>
			<textarea
				onChange={({ target: { value } }) => {
					setOutput('');
					setInput(value);
				}}
				value={input}
				ref={inputComp}
				onFocus={onFocusInput}
			></textarea>
			<div className="button-area">
				<Button onClick={onClickEncode}>{$$`hexie.encode`}</Button>
				<Button onClick={onClickDecode}>{$$`hexie.decode`}</Button>
			</div>
			<textarea value={copied ? $$`hexie.copied` : output} readOnly={true} onClick={onClickOutput} ref={outputComp}></textarea>
			<h2>{$$`hexie.custom-dict`}</h2>
			<input
				type="text"
				placeholder="富强,民主,文明,和谐,自由,平等,公正,法治,爱国,敬业,诚信,友善"
				onChange={({ target: { value } }) => {
					setOutput('');
					setCustomDict(value);
				}}
				value={customDict}
			/>
		</div>
	);
};

export default HexieEncoder;
