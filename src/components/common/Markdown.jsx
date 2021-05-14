import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord as style } from 'react-syntax-highlighter/dist/esm/styles/prism';
import gfm from 'remark-gfm';

const components = {
	code({ node, inline, className, children, ...props }) {
		const match = /language-(\w+)/.exec(className || '');
		return !inline && match ? <SyntaxHighlighter style={style} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} /> : <code className={className} {...props} />;
	}
};

const Markdown = ({ children, ...rest }) => {
	return (
		<div className="Markdown">
			<ReactMarkdown remarkPlugins={[gfm]} components={components} children={children} {...rest} />
		</div>
	);
};

export default Markdown;
