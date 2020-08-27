import React, { useEffect } from 'react';
import { getTimeDiff } from '../utils/misc';
import { Link } from 'react-router-dom';
import { useCallback } from 'react';

const PostEntry = ({ post }) => {
	console.log(post);
	const { title, user, created_at, comments, updated_at, number } = post;

	const onClickAvatar = useCallback(e => {
		window.open(user.html_url);
		e.stopPropagation();
		e.preventDefault();
	}, [])

	return (
		<Link to={`/forum/post/${number}`} className="PostEntry">
			<div onClick={onClickAvatar} className="avatar">
				<img src={user.avatar_url} alt={user.login} />
				<h2>{user.login}</h2>
			</div>
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