import React, { useEffect } from 'react';
import UserAvatar from './UserAvatar';
import { getTimeDiff } from '../utils/misc';

const PostBody = ({ post }) => {
	console.log(post);
	const { user, title, body, created_at } = post || {};
	return (
		<div className="PostBody">{post &&
			<div className="wrapper">
				<div className="title-area">
					<UserAvatar user={user} />
					<div className="info-area">
						<h2>{title}</h2>
						<time title={new Date(created_at).toLocaleString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false })}>{getTimeDiff(created_at)}</time>
					</div>
				</div>
				<div className="body-area">
					<p>{body}</p>
				</div>
			</div>
		}</div>
	);
}

export default PostBody;