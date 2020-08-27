import axios from 'axios';

export const http = axios.create();

export const get = http.get;
export const post = http.post;
export const put = http.put;
export const del = http.delete;

export default {
	http,
	get,
	post,
	put,
	del
};