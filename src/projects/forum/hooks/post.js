import { useState, useEffect, useCallback } from "react";
import { getPosts, getPost, getComments, postThread, replyThread } from "../services/post";
import swal from "sweetalert";
import whevent from "whevent";
import $$ from 'whi18n';

export const usePostList = () => {
	const [posts, setPosts] = useState([]);

	const loadPosts = useCallback(() => {
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

	const loadPost = useCallback(() => {
		id && getPost(id).then(post => {
			setPost(post);
		});
	}, [id, setPost]);

	const loadComments = useCallback(() => {
		id && getComments(id).then(post => {
			setComments(post);
		});
	}, [id, setComments]);

	useEffect(() => {
		loadPost();
		loadComments();
	}, [id]);

	return [post, comments, loadPost, loadComments];
};

export const usePostThread = () => {
	const post = useCallback((title, body) => {
		if (!title) {
			swal($$`error`, $$`please-enter-title`, 'error');
			return;
		}

		postThread(title, body).then(e => {
			whevent.emit('REFRESH_POSTS');
		}).catch(ex => {
			swal($$`post-failed`, $$`post-failed-try-again`, "error");
			console.error(ex);
		})
	}, []);

	return post;
};

export const useReplyThread = id => {
	const post = useCallback(body => {
		if (!body || !body.trim()) {
			swal($$`error`, $$`Please enter the comment!`, 'error');
			return;
		}

		replyThread(id, body).then(e => {
			whevent.emit('REFRESH_COMMENTS');
		}).catch(ex => {
			swal($$`post-failed`, $$`post-failed-try-again`, "error");
			console.error(ex);
		})
	}, [id]);

	return post;
}