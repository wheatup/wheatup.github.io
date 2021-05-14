import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Article from './Article';
import BlogList from './BlogList';

const Blog = props => {
	return (
		<section className="Blog">
			<Switch>
				<Route path="/blog/:id" component={Article} />
				<Route path="/blog/" component={BlogList} exact />
			</Switch>
		</section>
	);
};

export default Blog;
