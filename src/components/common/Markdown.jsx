import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const components = {
	code({ node, inline, className, children, ...props }) {
		const match = /language-(\w+)/.exec(className || '');
		return !inline && match ? <SyntaxHighlighter style={dark} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} /> : <code className={className} {...props} />;
	}
};

const Markdown = ({ children, ...rest }) => {
	return (
		<div className="Markdown">
			<ReactMarkdown components={components} children={children} {...rest} />
		</div>
	);
};

export default Markdown;
