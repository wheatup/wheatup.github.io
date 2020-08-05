import React, { useState, useCallback, useMemo } from 'react';
import Button from '../../common/Button';
import { encode, decode } from 'hexie-encode';

const HexieEncoder = props => {
	const [input, setInput] = useState('');
	const [customDict, setCustomDict] = useState('');
	const [output, setOutput] = useState('');

	const dict = useMemo(() => {
		if (customDict) {
			return customDict.split(/[,，]/).map(e => e.trim());
		}
	}, [customDict]);

	const onClickEncode = useCallback(() => {
		try {
			const result = dict && dict.length > 2 ? encode(input, dict) : encode(input);
			setOutput(result);
		} catch (ex) {
			setOutput('');
		}
	}, [input, dict, setOutput]);

	const onClickDecode = useCallback(() => {
		try {
			const result = dict && dict.length > 2 ? decode(input, dict) : decode(input);
			setOutput(result);
		} catch (ex) {
			setOutput('');
		}
	}, [input, dict, setOutput]);




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