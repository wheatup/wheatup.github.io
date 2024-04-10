import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Article from './Article';
import BlogList from './BlogList';

const Blog = props => {
	return (
		<section className="Blog">
			<Routes>
				<Route path="/blog/:id" component={Article} />
				<Route path="/blog/" component={BlogList} exact />
			</Routes>
		</section>
	);
};

export default Blog;
