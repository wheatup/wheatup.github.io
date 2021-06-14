import React, { useEffect, useMemo, useState } from 'react';
import { setData } from 'wherehouse';
import { CV as CV_VIEW } from '../../utils/store';
import $$ from 'whi18n';
import { useTitle } from '../../hooks/misc';

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
	{ name: 'Regex', value: 10 },
	{ name: 'HTML', value: 9 },
	{ name: 'TypeScript', value: 7 },
	{ name: 'Java', value: 6 },
	{ name: 'C#', value: 6 },
	{ name: 'PHP', value: 5 },
	{ name: 'Python', value: 5 }
];

const SKILL_TECHNEQUES = [
	{ name: 'React', value: 9 },
	{ name: 'Vue', value: 9 },
	{ name: 'Node.js', value: 8 },
	{ name: 'Git', value: 8 },
	{ name: 'Cocos Creator', value: 7 },
	{ name: 'Linux', value: 7 },
	{ name: 'Photoshop', value: 7 },
];

const LANGUAGES = [
	{ name: '中文', value: 10 },
	{ name: 'English', value: 9 },
	{ name: '日本語', value: 6 }
];

const CV = props => {
	const { pic, name, title } = useMemo(() => {
		const keys = ['pic', 'name', 'title'];
		return keys.reduce((acc, key) => ({ ...acc, [key]: $$`_cv.profile.${key}` }), {});
	}, []);

	useTitle(name);

	useEffect(() => {
		setData(CV_VIEW, true);
		window.localStorage.setItem('cv', '1');
	}, []);

	return (
		<section className="CV">
			<div className="left-panel">
				<div className="section profile">
					<img data-role="pic" src={pic} alt={name} />
					<p data-role="name">{name}</p>
					<p data-role="title">{title}</p>
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
			<div className="right-panel"></div>
		</section>
	);
};

export default CV;
