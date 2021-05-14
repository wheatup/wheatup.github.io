import React, { useState } from 'react';
import { useBlogList } from '../hooks/blog';
import { Link } from 'react-router-dom';
import $$ from 'whi18n';

const BlogList = props => {
	const blogs = useBlogList();

	return (
		<section className="BlogList">
			<h1>{$$`_blog.blogs`}</h1>
			<ul className="list" data-empty={$$`_blog.empty`}>
				{blogs.map(({ id, title, date, desc, tags }) => (
					<li className="entry" key={`blog_${id}`}>
						<Link to={`/blog/${id}`}>
							<h2>{title}</h2>
							<p>{desc}</p>
							<div className="footer">
								<time>{date}</time>
								<ul className="tags">
									{tags?.map(tag => (
										<li key={tag}>{tag}</li>
									))}
								</ul>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
};

export default BlogList;
