import React, { useEffect } from 'react';
import { useData } from 'wherehouse';
import { ME } from '../../../utils/store';
import UserAvatar from './UserAvatar';
import { useMemo } from 'react';
import Markdown from './Markdown';
import { getTimeDiff } from '../utils/misc';

const Comments = ({ comments }) => {
	return (
		<div className="Comments">
			<div className="wrapper">{comments.map(comment => (
				<div key={comment.id.toString()} className="comment-wrapper">
					<time title={new Date(comment.created_at).toLocaleString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false })}>{getTimeDiff(comment.created_at)}</time>
					<Comment comment={comment} />
				</div>
			))}</div>
		</div>
	);
}

const Comment = ({ comment }) => {
	const { body, user } = comment;
	const me = useData(ME);
	const isMe = useMemo(() => me && me.id === user.id);

	return (
		<div className={`Comment${isMe ? ' me' : ''}`}>
			<UserAvatar user={user} />
			<div className="content">
				<Markdown source={body} />
			</div>
		</div>
	);
}



export default Comments;