import { useState, useEffect, useCallback } from "react";
import { getPosts, getPost, getComments, postThread } from "../services/post";
import swal from "sweetalert";

export const usePostList = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		getPosts().then(posts => {
			setPosts(posts);
		});
	}, []);

	return posts
};

export const usePostDetail = id => {
	const [post, setPost] = useState(null);
	const [comments, setComments] = useState([]);

	useEffect(() => {
		id && getPost(id).then(post => {
			setPost(post);
		});

		id && getComments(id).then(comments => {
			setComments(comments);
		});
	}, [id]);

	return [post, comments];
};

export const usePostThread = () => {
	const post = useCallback((title, body) => {
		if (!title) {
			swal('错误', '请输入标题！', 'error');
			return false;
		}

		postThread(title, body).then(e => {
			console.log(e);
		}).catch(ex => {
			swal('发布失败', '主题发布失败，请重试！', "error");
			console.error(ex);
		})

		return true;
	}, []);

	return post;
};