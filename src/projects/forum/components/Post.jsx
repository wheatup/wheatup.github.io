import React, { useEffect } from 'react';
import { usePostDetail, useReplyThread } from '../hooks/post';
import { useParams } from 'react-router-dom';
import PostBody from './PostBody';
import Comments from './Comments';
import ChatInput from './ChatInput';
import whevent from 'whevent';

const Post = props => {
	const { id } = useParams();
	const [post, comments, _, loadComments] = usePostDetail(id);

	const reply = useReplyThread(id);

	useEffect(() => {
		whevent.on('REFRESH_COMMENTS', loadComments);

		return () => whevent.off('COMMENTS', loadComments);
	}, []);

	return (
		<div className="Post">
			<PostBody post={post} />
			<Comments comments={comments} />
			<ChatInput onPost={reply} />
		</div>
	);
}

export default Post;