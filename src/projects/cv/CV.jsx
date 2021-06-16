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

const SKILL_TECHNEQUES = () => [
	{ name: 'Regex', value: 10 },
	{ name: 'Vue', value: 9 },
	{ name: 'React', value: 9 },
	{ name: $$`_cv.ui-ux-animation`, value: 9 },
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

const TIMELINE = () => [
	...(function* () {
		for (let i = 1; i <= 5; i++) {
			yield {
				time: $$`_cv._timeline.exp${i}.date`,
				icon: $$`_cv._timeline.exp${i}.icon`,
				content: $$`_cv._timeline.exp${i}.content`,
				institution: $$`_cv._timeline.exp${i}.institution`,
				url: $$`_cv._timeline.exp${i}.url`,
				title: $$`_cv._timeline.exp${i}.title`,
			};
		}
	})()
];

const CV = ({ location }) => {
	const { pic, name, title, email, phone, github, codepen, stackoverflow, linkedin, itchio, homepage } = useMemo(() => {
		const keys = ['pic', 'name', 'title', 'email', 'phone', 'github', 'codepen', 'stackoverflow', 'linkedin', 'itchio', 'homepage'];
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
								<span>{email}</span>
							</a>
						</li>
						<li>
							<a href="javascript: void(0)">
								<i className="icon-phone"></i>
								<span>{phone}</span>
							</a>
						</li>
						<li>
							<a target="_blank" href="https://github.com/wheatup">
								<i className="icon-github"></i>
								<span>{github}</span>
							</a>
						</li>
						<li>
							<a target="_blank" href="https://codepen.io/wheatup">
								<i className="icon-codepen"></i>
								<span>{codepen}</span>
							</a>
						</li>
						<li>
							<a target="_blank" href="https://stackoverflow.com/users/10289265/hao-wu">
								<i className="icon-stackoverflow"></i>
								<span>{stackoverflow}</span>
							</a>
						</li>
						<li>
							<a target="_blank" href="https://wheatup.itch.io/">
								<i className="icon-itchio-textless-white"></i>
								<span>{itchio}</span>
							</a>
						</li>
						<li>
							<a target="_blank" href="https://www.linkedin.com/in/hao-wu-55037b170/">
								<i className="icon-linkedin"></i>
								<span>{linkedin}</span>
							</a>
						</li>
						<li>
							<a href="https://wheatup.github.io">
								<i className="icon-home"></i>
								<span>{homepage}</span>
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
						{SKILL_TECHNEQUES().map(({ name, value }) => (
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
					<p>{$$`_cv._about-me`}</p>
				</div>

				<div className="section timeline">
					<h2 className="title">
						<i className="icon-stats-dots"></i>
						<span>{$$`_cv.timeline`}</span>
					</h2>
					<Timeline data={TIMELINE()} />
				</div>

				<div className="section achievement">
					<h2 className="title">
						<i className="icon-profile"></i>
						<span>{$$`_cv.achievement`}</span>
					</h2>
					<div className="content" dangerouslySetInnerHTML={{__html: $$`_cv._achievement`}}></div>
				</div>

				<Background />
			</div>
		</section>
	);
};

export default CV;
