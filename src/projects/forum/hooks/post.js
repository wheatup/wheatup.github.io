import { useState, useEffect, useCallback } from "react";
import { getPosts, getPost, getComments, postThread } from "../services/post";
import swal from "sweetalert";
import whevent from "whevent";

export const usePostList = () => {
	const [posts, setPosts] = useState([]);

	const loadPosts = useCallback(() => {
		console.log('reload');
		getPosts().then(posts => {
			setPosts(posts);
		});
	}, [setPosts]);

	useEffect(() => {
		loadPosts();
	}, []);

	return [posts, loadPosts];
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
		}

		postThread(title, body).then(e => {
			console.log(e);
			whevent.emit('REFRESH_POSTS');
		}).catch(ex => {
			swal('发布失败', '主题发布失败，请重试！', "error");
			console.error(ex);
		})
	}, []);

	return post;
};