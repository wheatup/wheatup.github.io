import React, { useState } from 'react';

const Timeline = ({ data }) => {
	return (
		<section className="Timeline">
			<div className="entries">
				{data.map(({ time, icon, content }, i) => (
					<div key={`${time}_${i}`} className="entry">
						<div className="line">
							<i className={`icon-${icon}`} />
						</div>
						<div className="wrapper">
							<time>{time}</time>
							<div className="content">{content}</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Timeline;
