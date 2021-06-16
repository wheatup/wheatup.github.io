import React, { useState } from 'react';
import $$ from 'whi18n';

const Timeline = ({ data }) => {
	return (
		<section className="Timeline">
			<div className="entries">
				{data.map(({ time, icon, content, institution, url, title }, i) => (
					<div key={`${time}_${i}`} className="entry">
						<div className="line">
							<i className={`icon-${icon}`} />
						</div>
						<div className="wrapper">
							<time>{time}</time>
							<div className="position-area">
								<span className="position">{title}</span>
								<span className="at">@</span>
								{url && url.startsWith('http') ? (
									<a href={url} target="blank" className="institution">
										{institution}
									</a>
								) : (
									<p className="institution">{institution}</p>
								)}
							</div>
							<div className="content" dangerouslySetInnerHTML={{ __html: content }}></div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Timeline;
