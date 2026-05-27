import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Article from './Article';
import BlogList from './BlogList';

const Blog = () => {
	return (
		<section className="Blog">
			<Routes>
				<Route index element={<BlogList />} />
				<Route path=":id" element={<Article />} />
			</Routes>
		</section>
	);
};

export default Blog;
