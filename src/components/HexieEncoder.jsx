import React, { useState } from 'react';

const HexieEncoder = props => {

	const [input, setInput] = useState('');

	return (
		<div className="HexieEncoder">
			<textarea onChange={({ target: { value } }) => setInput(value)} value={input}></textarea>
		</div>
	);
}

export default HexieEncoder;