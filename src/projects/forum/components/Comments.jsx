import React from 'react';
import { useData } from 'wherehouse';
import { ME } from '../../../utils/store';
import UserAvatar from './UserAvatar';
import Markdown from './Markdown';
import { getTimeDiff } from '../utils/misc';
import { useCallback } from 'react';


const Comments = ({ comments }) => {



	let lastTime = 0;
	const shouldShowTime = time => {
		if (time - lastTime > 60 * 1000) {
			lastTime = time;
			return true;
		}
	};

	const me = useData(ME);
	const isMe = useCallback(user => me && me.id === user.id, []);

	return (
		<div className="Comments">{comments.map(comment => (
			<div key={comment.id.toString()} className="comment-wrapper">
				{shouldShowTime(new Date(comment.created_at).getTime()) && <time className={isMe(comment.user) ? 'me' : ''} title={new Date(comment.created_at).toLocaleString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false })}>{getTimeDiff(comment.created_at)}</time>}
				<Comment comment={comment} isMe={isMe(comment.user)} />
			</div>
		))}
		</div>
	);
}

const Comment = ({ comment, isMe }) => {
	const { body, user } = comment;
	
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