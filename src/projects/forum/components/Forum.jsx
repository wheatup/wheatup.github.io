import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PostList from './PostList';
import Post from './Post';
import { useTitle } from '../../../hooks/misc';

const Forum = () => {
	useTitle('wheatup');
	return (
		<div className="Forum">
			<Routes>
				<Route index element={<PostList />} />
				<Route path="post/:id" element={<Post />} />
			</Routes>
		</div>
	);
};

export default Forum;
