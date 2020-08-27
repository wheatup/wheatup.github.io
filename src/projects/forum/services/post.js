import http from "../utils/http";

export const getPosts = async () => {
	const result = await http.get('/issues?labels=forum');
	if (result && result.status === 200 && result.data) {
		return result.data;
	} else {
		throw new Error(result);
	}
};

export const getPost = async id => {
	const result = await http.get(`/issues/${id}`);
	if (result && result.status === 200 && result.data) {
		return result.data;
	} else {
		throw new Error(result);
	}
};

export const getComments = async id => {
	const result = await http.get(`/issues/${id}/comments`);
	if (result && result.status === 200 && result.data) {
		return result.data;
	} else {
		throw new Error(result);
	}
}