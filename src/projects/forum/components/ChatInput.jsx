import React, { useCallback } from 'react';
import { useData } from 'wherehouse';
import { ME } from '../../../utils/store';
import { useState } from 'react';
import whevent from 'whevent';

const Button = ({ children, ...rest }) => {
	return (
		<a className="Button" href="javascript: void(0)" {...rest}>{children}</a>
	);
};

const ChatInput = ({ hasBody, onPost }) => {
	const me = useData(ME);

	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	const doPost = useCallback(() => {
		if (onPost) {
			onPost(title, body);
			setTitle('');
			setBody('');
		}
	}, [title, body, onPost]);

	return (
		<div className={`ChatInput${me ? '' : ' locked'}`}>
			<div className="title-area">
				<Button><i className="icon-grin"></i></Button>
				<Button><i className="icon-images"></i></Button>
				{hasBody ? <input type="text" value={title} onChange={e => setTitle(e.target.value)} /> : <textarea rows="1" value={title} onChange={e => setTitle(e.target.value)}></textarea>}
				<Button onClick={doPost}><i className="icon-paper-plane"></i></Button>
			</div>
			{hasBody && <div className="body-area">
				<textarea rows="4" value={body} onChange={e => setBody(e.target.value)}></textarea>
			</div>}
		</div>
	);
}

export default ChatInput;