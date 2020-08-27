import React, { useEffect } from 'react';

const PostBody = ({ post }) => {
	console.log(post);
	return (
		<div className="PostBody">{post &&
			<div>{post.body}</div>
		}</div>
	);
}

export default PostBody;