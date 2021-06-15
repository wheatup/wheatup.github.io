import React, { useEffect, useMemo, useState } from 'react';
import { setData } from 'wherehouse';
import { CV as CV_VIEW, FULLSCREEN } from '../../utils/store';
import $$ from 'whi18n';
import { useTitle } from '../../hooks/misc';
import Background from './components/Background';
import Timeline from './components/Timeline';

const Stars = ({ value }) => {
	return (
		<section className="Stars">
			{[
				...(function* () {
					for (let i = 0; i < 5; i++) {
						yield <i key={`star_${i}`} className={value <= i * 2 ? 'icon-star-empty' : value == i * 2 + 1 ? 'icon-star-half' : 'icon-star-full'} />;
					}
				})()
			]}
		</section>
	);
};

const PROGRAMMING_LANGUAGES = [
	{ name: 'JavaScript', value: 10 },
	{ name: 'CSS', value: 10 },
	{ name: 'HTML', value: 9 },
	{ name: 'TypeScript', value: 7 },
	{ name: 'Java', value: 6 },
	{ name: 'C#', value: 6 },
	{ name: 'PHP', value: 5 },
	{ name: 'Python', value: 5 }
];

const SKILL_TECHNEQUES = [
	{ name: 'Regex', value: 10 },
	{ name: 'Vue', value: 9 },
	{ name: 'React', value: 9 },
	{ name: 'Node.js', value: 8 },
	{ name: 'Git', value: 8 },
	// { name: 'Cocos Creator', value: 7 },
	{ name: 'Linux', value: 7 }
	// { name: 'Photoshop', value: 7 }
];

const LANGUAGES = [
	{ name: '中文', value: 10 },
	{ name: 'English', value: 9 },
	{ name: '日本語', value: 6 }
];

const TIMELINE = [
	{ time: '2020/01 - Present', icon: 'business_center', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ipsa voluptate atque natus et repudiandae. Itaque explicabo at fuga facilis nesciunt? Dolor sapiente, incidunt placeat odit possimus et harum fugiat.' },
	{ time: '2020/01 - 2020/01', icon: 'business_center', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ipsa voluptate atque natus et repudiandae. Itaque explicabo at fuga facilis nesciunt? Dolor sapiente.' },
	{ time: '2020/01 - 2020/01', icon: 'business_center', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ipsa voluptate atque natus et repudiandae. Itaque explicabo at fuga facilis nesciunt? Dolor sapiente, incidunt placeat odit possimus et harum fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ipsa voluptate atque natus et repudiandae. Itaque explicabo at fuga facilis nesciunt? Dolor sapiente, incidunt placeat odit possimus et harum fugiat.' },
	{ time: '2020/01 - 2020/01', icon: 'lightbulb', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ipsa voluptate atque natus et repudiandae. Itaque explicabo at fuga facilis nesciunt?' },
	{ time: '2020/01 - 2020/01', icon: 'education', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ipsa voluptate atque natus et repudiandae. Itaque explicabo at fuga.' },
]

const CV = ({ location }) => {
	const { pic, name, title } = useMemo(() => {
		const keys = ['pic', 'name', 'title'];
		return keys.reduce((acc, key) => ({ ...acc, [key]: $$`_cv.profile.${key}` }), {});
	}, []);

	useTitle(name);

	useEffect(() => {
		setData(CV_VIEW, true);
		window.localStorage.setItem('cv', '1');
	}, []);

	useEffect(() => {
		const search = new URLSearchParams(location.search);
		console.log(search.get('fullscreen'));
		if (search.get('fullscreen')) {
			setData(FULLSCREEN, true);
		}

		return () => setData(FULLSCREEN, false);
	}, [location]);

	return (
		<section className="CV">
			<div className="left-panel">
				<div className="section profile">
					<img data-role="pic" src={pic} alt={name} />
					<div data-role="details">
						<p data-role="name">{name}</p>
						<p data-role="title">{title}</p>
					</div>
				</div>

				<div className="section contact">
					<h2 className="title">{$$`_cv.contact`}</h2>
					<ul className="list" data-role="contact-list">
						<li>
							<a target="_blank" href="mailto:acphun@gmail.com">
								<i className="icon-envelope"></i>
								<span>acphun@gmail.com</span>
							</a>
						</li>
						<li>
							<a href="javascript: void(0)">
								<i className="icon-phone"></i>
								<span>+817043766865</span>
							</a>
						</li>
						<li>
							<a target="_blank" href="https://github.com/wheatup">
								<i className="icon-github"></i>
								<span>wheatup</span>
							</a>
						</li>
						<li>
							<a target="_blank" href="https://codepen.io/wheatup">
								<i className="icon-codepen"></i>
								<span>wheatup</span>
							</a>
						</li>
						<li>
							<a target="_blank" href="https://stackoverflow.com/users/10289265/hao-wu">
								<i className="icon-stackoverflow"></i>
								<span>Hao Wu</span>
							</a>
						</li>
						<li>
							<a target="_blank" href="https://www.linkedin.com/in/hao-wu-55037b170/">
								<i className="icon-linkedin"></i>
								<span>Hao Wu</span>
							</a>
						</li>
					</ul>
				</div>

				<div className="section programming-language">
					<h2 className="title">{$$`_cv.programming-language`}</h2>
					<ul className="list skill-list" data-role="programming-language">
						{PROGRAMMING_LANGUAGES.map(({ name, value }) => (
							<li key={name}>
								<label>{name}</label>
								<Stars value={value} />
							</li>
						))}
					</ul>
				</div>

				<div className="section skills">
					<h2 className="title">{$$`_cv.skill-techniques`}</h2>
					<ul className="list skill-list" data-role="skill-techniques">
						{SKILL_TECHNEQUES.map(({ name, value }) => (
							<li key={name}>
								<label>{name}</label>
								<Stars value={value} />
							</li>
						))}
					</ul>
				</div>

				<div className="section languages">
					<h2 className="title">{$$`_cv.languages`}</h2>
					<ul className="list skill-list" data-role="languages">
						{LANGUAGES.map(({ name, value }) => (
							<li key={name}>
								<label>{name}</label>
								<Stars value={value} />
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="right-panel">
				<div className="section about-me">
					<h2 className="title">
						<i className="icon-profile"></i>
						<span>{$$`_cv.about-me`}</span>
					</h2>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus id esse laudantium placeat molestias in. Nihil, fugit sed corporis animi dolorem sapiente nisi quam labore, aliquam sunt praesentium vitae voluptate totam magnam. Voluptates accusamus voluptatum ipsum,
						beatae totam molestiae laboriosam. Impedit in tempora omnis quibusdam beatae dignissimos qui voluptatibus reprehenderit voluptas magnam nesciunt nobis sunt, nam doloribus provident accusamus praesentium a quam libero doloremque necessitatibus facere ipsa at ex? Dolore ipsum,
						quibusdam similique id suscipit consectetur magnam repudiandae cum odit perspiciatis consequuntur voluptatum aliquid itaque fuga architecto illo tempora nostrum aperiam quisquam eos? Suscipit labore doloremque possimus ipsa pariatur laborum!
					</p>
				</div>

				<div className="section about-me">
					<h2 className="title">
						<i className="icon-profile"></i>
						<span>{$$`_cv.about-me`}</span>
					</h2>
					<Timeline data={TIMELINE} />
				</div>

				<div className="section about-me">
					<h2 className="title">
						<i className="icon-profile"></i>
						<span>{$$`_cv.about-me`}</span>
					</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore ex quasi quisquam saepe nihil! Beatae modi, fugiat sed aliquid dolorem laborum blanditiis deleniti, magnam aspernatur repudiandae tenetur hic quas fuga sint! Impedit perferendis nulla quibusdam molestias eius
						architecto corporis nostrum obcaecati laboriosam incidunt cumque odio rerum dolorum consequatur ea ratione eveniet debitis voluptas aspernatur, cum nobis, numquam asperiores! Maiores, praesentium.
					</p>
				</div>

				<Background />
			</div>
		</section>
	);
};

export default CV;
