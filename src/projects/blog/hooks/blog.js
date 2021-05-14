import { useEffect, useState } from "react";
import { setData, useData } from "wherehouse";
import { Blog } from '../../../utils/store';
import { getBlog, getBlogList } from "../services/blog";


export const useBlogList = () => {
	const blogs = useData(Blog.BLOGS);

	useEffect(() => {
		if (!blogs?.length) {
			(async () => {
				setData(Blog.BLOGS, await getBlogList());
			})();
		}
	}, [blogs]);

	return blogs;
};

export const useBlog = id => {
	const [blog, setBlog] = useState('');

	useEffect(() => {
		(async () => setBlog(await getBlog(id)))();
	}, [id]);

	return blog;
}