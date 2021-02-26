import { useState, useEffect, useCallback } from "react";
import http from "../utils/http";
import swal from "sweetalert2";
import { ME } from "../utils/store";
import { setData, useData } from "wherehouse";
import $$ from 'whi18n';


// develop
// const CLIENT_ID = '927fbe8aa1a54d91db14';
// const CLIENT_SECRET = 'ef21685a2fadd25826f34083c9fa374c7ba78718';

// product
const CLIENT_ID = '9a7b4e01285d97e29469';
const CLIENT_SECRET = '340d6e3e650e8d915562cab6eb1ae2b295abc7c9';


export const useAuthentication = () => {
	const user = useData(ME);

	const login = useCallback(() => {
		window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo`;
	}, [])

	useEffect(() => {
		const code = /code=(\w+)/[Symbol.match](window.location.href);
		if (code && code[1]) {
			// TODO: use a better way to handle cors requests
			// http.post('https://github.com/login/oauth/access_token', {
			http.post('https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token', {
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
				code: code[1]
			}).then(e => {
				if (e.data) {
					const token = /access_token=(\w+)/[Symbol.match](e.data);
					if (token && token[1]) {
						window.localStorage.setItem('token', token[1]);
						window.location.href = window.location.href.replace(/[&?]code=\w+/, '');
					}
				}
			}).catch(ex => {
				swal.fire({
					title: $$`auth.auth-failed`,
					html: $$`auth.auth-failed-detail`,
					icon: 'error',
					confirmButtonText: $$`auth.grant-auth`,
					cancelButtonText: $$`auth.cancel`,
					showCloseButton: true,
					showCancelButton: true
				}).then((result) => {
					if (result.isConfirmed) {
						window.open('https://cors-anywhere.herokuapp.com/');
					}
				});
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
						setData(ME, e.data);
					}
				}).catch(ex => {
					swal.fire($$`auth.auth-failed`, $$`auth.auth-expired-detail`, "error");
					console.error(ex);
					window.localStorage.removeItem('token');
				})
			}
		}

	}, [window.location.href, user]);

	return [user, login];
};