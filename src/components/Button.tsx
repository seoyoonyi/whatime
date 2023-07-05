import React from 'react';

interface IButtonProps {
	onClick?: () => void;
	children?: React.ReactNode;
	className?: string;
}

const Button = ({ onClick, children, className }: IButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={`border bg-retroGray border-b-black border-r-black border-t-white border-l-white ${className}`}
		>
			{children}
		</button>
	);
};

export default Button;
