import http from "../utils/http";

export const getPosts = async () => {
	const result = await http.get('/issues');
	if (result && result.data) {
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
	}, {
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/vnd.github.v3+json'
		}
	});

	if (result && result.data) {
		return result.data;
	} else {
		throw new Error(result);
	}
}


export const replyThread = async (id, body) => {
	const result = await http.post(`/issues/${id}/comments`, {
		body,
	}, {
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/vnd.github.v3+json'
		}
	});

	if (result && result.data) {
		return result.data;
	} else {
		throw new Error(result);
	}
}