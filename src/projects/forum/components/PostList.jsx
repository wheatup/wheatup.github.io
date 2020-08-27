import React, { useEffect } from 'react';
import { usePostList } from '../hooks/post';
import PostEntry from './PostEntry';

const PostList = props => {
	const posts = usePostList();
	return (
		<div className="PostList">{posts && posts.map(post => (
			<PostEntry key={post.node_id} post={post} />
		))}</div>
	);
}

export default PostList;