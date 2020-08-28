import React, { useEffect } from 'react';
import { useAuthentication } from '../../hooks/authentication';
import { useCallback } from 'react';

const User = props => {
	const [user, login] = useAuthentication();

	const onClickUser = useCallback(() => {
		window.open(user.html_url);
	}, [user]);

	return (
		<a className={`User${user ? ' login' : ''}`} href="javascript: void(0)" onClick={user ? onClickUser: login}>{
			user ? <img src={user.avatar_url} alt={user.login} title={user.login} /> : <i className="icon-user"></i>
		}</a>
	);
}

export default User;