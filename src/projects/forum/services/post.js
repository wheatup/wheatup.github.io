import http from "../utils/http";

export const getPosts = async () => {
	const result = await http.get('/issues');
	if (result && result.data) {
		console.log(result.data);
		return result.data;
	} else {
		throw new Error(result);
	}
};

export const getPost = async id => {
	const result = await http.get(`/issues/${id}`);
	if (result && result.data) {
		return result.data;
	} else {
		throw new Error(result);
	}
};

export const getComments = async id => {
	const result = await http.get(`/issues/${id}/comments`);
	if (result && result.data) {
		return result.data;
	} else {
		throw new Error(result);
	}
}

export const postThread = async (title, body) => {
	const result = await http.post('/issues', {
		title,
		body,
		labels: ['forum'],
		assignees: [],
		milestone: 1,
		repo: 'wheatup.github.io',
		owner: 'wheatup',
	}, {
		headers: {
			'Accept': 'application/vnd.github.v3+json'
		}
	});
	if (result && result.data) {
		return result.data;
	} else {
		throw new Error(result);
	}
}