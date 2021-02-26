import React, { useEffect } from 'react';
import { usePostList, usePostThread } from '../hooks/post';
import PostEntry from './PostEntry';
import ChatInput from './ChatInput';
import { useCallback } from 'react';
import swal from 'sweetalert2';
import whevent from 'whevent';

const PostList = props => {
	const [posts, reload] = usePostList();

	const post = usePostThread();

	useEffect(() => {
		whevent.on('REFRESH_POSTS', reload);

		return () => whevent.off('REFRESH_POSTS', reload);
	}, []);

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