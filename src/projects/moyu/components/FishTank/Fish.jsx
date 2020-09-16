import React, { useEffect } from 'react';

const Fish = ({ tier, point, id }) => {
	return (
		<a href="javascript: void(0)" className="Fish" id={`fish-${id}`}>
			<img src={`/images/moyu/fish-${tier + 1}.svg`} />
		</a>
	);
}

export default Fish;