import http from "../../../utils/http";

const blogs = [
	{ id: 1, title: 'Test Blog', date: '2020-05-13', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis magnam aperiam sequi at alias animi possimus sunt labore dolorem, debitis quis facilis architecto voluptatum repellat maiores blanditiis suscipit quo maxime temporibus id. Quis fugit labore inventore? Illum nobis veniam doloremque aut pariatur, dolor quis minima voluptatum sit deleniti fuga a nostrum amet numquam. Ad, repellendus delectus. Aspernatur eaque praesentium quia excepturi vel aliquid pariatur expedita iste voluptatibus odio accusamus commodi provident, deserunt numquam nulla alias, culpa, minima ea atque consectetur.', file: '/blogs/TestBlog.md', tags: ['测试'] },
	{ id: 2, title: '博客开张大吉', date: '2020-05-14', desc: '日服第一切图仔的博客上线了', file: '/blogs/HelloWorld.md', tags: ['测试', '摸鱼'] },
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