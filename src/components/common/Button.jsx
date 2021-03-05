import React from 'react';

const Button = ({ children, disabled, onClick, ...rest }) => {
	return (
		<a onClick={(...args) => onClick && !disabled && onClick(...args)} className={`Button${disabled ? ' disabled' : ''}`} href="javascript: void(0)" {...rest}>
			{children}
		</a>
	);
};

export default Button;
