import React from 'react';
import ReactMarkdown from 'react-markdown';

const Markdown = ({ ...rest }) => {
	return (
		<div className="Markdown">
			<ReactMarkdown {...rest} />
		</div>
	);
}

export default Markdown;