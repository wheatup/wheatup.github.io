import React, { useCallback } from 'react';

const UserAvatar = ({ user }) => {

	const onClickAvatar = useCallback(e => {
		window.open(user.html_url);
		e.stopPropagation();
		e.preventDefault();
	}, [])

	return (
		<div onClick={onClickAvatar} className="UserAvatar">{
			user ? <>
				<img src={user.avatar_url} alt={user.login} />
				<h2>{user.login}</h2>
			</> :
				<i className="icon-user"></i>

		}</div>
	);
}

export default UserAvatar;