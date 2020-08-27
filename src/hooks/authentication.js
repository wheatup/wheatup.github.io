import { useState, useEffect, useCallback } from "react";
import http from "../utils/http";
import swal from "sweetalert";

export const useAuthentication = () => {
	const [user, setUser] = useState(null);

	const login = useCallback(() => {
		window.location.href = 'https://github.com/login/oauth/authorize?client_id=9a7b4e01285d97e29469';
	}, [])

	useEffect(() => {
		const code = /code=(\w+)/[Symbol.match](window.location.href);
		if (code && code[1]) {
			http.post('https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token', {
				client_id: '9a7b4e01285d97e29469',
				client_secret: '340d6e3e650e8d915562cab6eb1ae2b295abc7c9',
				code: code[1]
			}).then(e => {
				if (e.data) {
					const token = /access_token=(\w+)/[Symbol.match](e.data);
					if (token && token[1]) {
						window.localStorage.setItem('token', token[1]);
						window.location.href = window.location.href.replace(/[&?]code=\w+/, '');
					}
				}
				console.log(e);
			}).catch(ex => {
				swal("授权失败", "登录失败，请重试！", "error");
				console.error(ex);
			})
		} else if (!user) {
			const token = window.localStorage.getItem('token');
			if (token) {
				http.get('https://api.github.com/user', {
					headers: {
						'Authorization': 'token ' + token
					}
				}).then(e => {
					if (e && e.data) {
						setUser(e.data);
					}
				}).catch(ex => {
					swal("授权失败", "登录已过期，请重新登录！", "error");
					console.error(ex);
					window.localStorage.removeItem('token');
				})
			}
		}

	}, [window.location.href, user]);

	return [user, login];
};