import React, { useEffect } from 'react';

const Button = ({ children, onClick, ...rest }) => {
	return (
		<a onClick={(...args) => onClick && onClick(...args)} className="Button" href="javascript: void(0)" {...rest}>{ children }</a>
	);
}

export default Button;