import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBlog } from '../hooks/blog';
import Markdown from '../../../components/common/Markdown';

const Article = props => {
	const { id } = useParams();
	const blog = useBlog(id);

	return (
		<section className="Article">
			<Markdown>{blog}</Markdown>
		</section>
	);
};

export default Article;
