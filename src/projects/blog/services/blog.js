import http from "../../../utils/http";

const blogs = [
	{ id: 1, title: 'Test Blog', date: '2020-05-13', desc: 'This is just a test blog.', file: '/blogs/TestBlog.md', tags: ['dummy', 'first post'] },
	{ id: 2, title: 'Test Blog 2', date: '2020-05-14', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis magnam aperiam sequi at alias animi possimus sunt labore dolorem, debitis quis facilis architecto voluptatum repellat maiores blanditiis suscipit quo maxime temporibus id. Quis fugit labore inventore? Illum nobis veniam doloremque aut pariatur, dolor quis minima voluptatum sit deleniti fuga a nostrum amet numquam. Ad, repellendus delectus. Aspernatur eaque praesentium quia excepturi vel aliquid pariatur expedita iste voluptatibus odio accusamus commodi provident, deserunt numquam nulla alias, culpa, minima ea atque consectetur.', file: '/blogs/TestBlog2.md', tags: ['dummy'] },
	{ id: 3, title: 'Test Blog 3', date: '2020-05-14', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis magnam aperiam sequi at alias animi possimus sunt labore dolorem, debitis quis facilis architecto voluptatum repellat maiores blanditiis suscipit quo maxime temporibus id. Quis fugit labore inventore? Illum nobis veniam doloremque aut pariatur, dolor quis minima voluptatum sit deleniti fuga a nostrum amet numquam. Ad, repellendus delectus. Aspernatur eaque praesentium quia excepturi vel aliquid pariatur expedita iste voluptatibus odio accusamus commodi provident, deserunt numquam nulla alias, culpa, minima ea atque consectetur.', file: '/blogs/TestBlog2.md' },
];

export const getBlogList = async () => {
	return await blogs;
};

export const getBlog = async id => {
	const file = blogs.find(({ id: _id }) => _id == id)?.file;
	if (file) {
		const blog = await http.get(file);
		return blog.data ?? '';
	}
	return '';
}

export default {
	getBlog,
	getBlogList
}