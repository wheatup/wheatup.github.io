import React from 'react';
import { getTimeDiff } from '../utils/misc';
import { Link } from 'react-router-dom';
import UserAvatar from './UserAvatar';

const PostEntry = ({ post }) => {
	const { title, user, created_at, comments, updated_at, number } = post;

	return (
		<Link to={`/forum/post/${number}`} className="PostEntry">
			<UserAvatar user={user} />
			<div className="summary">
				<h2>{title}</h2>
				<time className="create">{getTimeDiff(created_at)}</time>
			</div>
			<span className="details">
				<span className="comments">{comments}</span>
			</span>
		</Link>
	);
}

export default PostEntry;