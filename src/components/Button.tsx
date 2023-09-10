import React, { MouseEventHandler } from 'react';

export interface IButtonProps {
	onClick?: MouseEventHandler<HTMLButtonElement>;
	children?: React.ReactNode;
	className?: string;
	disabled?: boolean;
}

const Button = ({ onClick, children, className, disabled }: IButtonProps) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`border-2 bg-retroGray border-b-black border-r-black border-t-white border-l-white 
			  active:border-t-black active:border-l-black active:border-b-white active:border-r-white
			  ${className}`}
		>
			{children}
		</button>
	);
};

export default Button;
