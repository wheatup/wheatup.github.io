import React, { useEffect } from 'react';
import { usePostDetail } from '../hooks/post';
import { useParams } from 'react-router-dom';
import PostBody from './PostBody';
import Comments from './Comments';

const Post = props => {
	const { id } = useParams();
	const [post, comments] = usePostDetail(id);

	return (
		<div className="Post">
			<PostBody post={post} />
			<Comments comments={comments} />
		</div>
	);
}

export default Post;