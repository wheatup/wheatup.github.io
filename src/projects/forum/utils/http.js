import axios from 'axios';

const http = axios.create({
	baseURL: 'https://api.github.com/repos/wheatup/wheatup.github.io',
});

let authorized = false;

const getHttp = () => {
	if (!authorized) {
		let token = window.localStorage.getItem('token');
		if (token) {
			http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
			authorized = true;
		}
	}
	return http;
}

export const get = (...args) => getHttp().get(...args);
export const post = (...args) => getHttp().post(...args);
export const put = (...args) => getHttp().put(...args);
export const del = (...args) => getHttp().delete(...args);

export default {
	get,
	post,
	put,
	del
};