import React, { useEffect } from 'react';
import { usePostList, usePostThread } from '../hooks/post';
import PostEntry from './PostEntry';
import ChatInput from './ChatInput';
import { useCallback } from 'react';
import swal from 'sweetalert';

const PostList = props => {
	const posts = usePostList();

	const post = usePostThread();

	return (
		<div className="PostList">
			<div className="list-wrapper">
				<div className="list">{posts && posts.map(post => (
					<PostEntry key={post.node_id} post={post} />
				))}</div>
			</div>
			<ChatInput hasBody={true} onPost={post} />
		</div>
	);
}

export default PostList;