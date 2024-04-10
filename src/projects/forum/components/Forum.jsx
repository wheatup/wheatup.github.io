import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PostList from './PostList';
import Post from './Post';
import { useTitle } from '../../../hooks/misc';

const Forum = props => {
	useTitle('wheatup');
	return (
		<div className="Forum">
			<Routes>
				<Route path="/forum/post/:id" component={Post} />
				<Route path="/forum/" component={PostList} exact />
			</Routes>
		</div>
	);
};

export default Forum;
