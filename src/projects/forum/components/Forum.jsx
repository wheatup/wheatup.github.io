import React from 'react';
import {
	Switch,
	Route,
} from "react-router-dom";
import PostList from './PostList';
import Post from './Post';

const Forum = props => {
	return (
		<div className="Forum">
			<Switch>
				<Route path="/forum/post/:id" component={Post} />
				<Route path="/forum/" component={PostList} exact />
			</Switch>
		</div>
	);
}

export default Forum;