import { useState, useEffect } from "react";
import { getPosts, getPost, getComments } from "../services/post";

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