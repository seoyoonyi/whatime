import React, { MouseEventHandler } from 'react';

export interface IButtonProps {
	onClick?: MouseEventHandler<HTMLButtonElement | HTMLLIElement>;
	children?: React.ReactNode;
	className?: string;
	disabled?: boolean;
}

const Button = ({ onClick, children, className, disabled }: IButtonProps) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`border-2 ${
				disabled
					? 'border-t-black border-l-black border-b-white border-r-white'
					: 'border-b-black border-r-black border-t-white border-l-white'
			} 
			${disabled && 'cursor-not-allowed opacity-50'}
			bg-retroGray
			active:border-t-black active:border-l-black active:border-b-white active:border-r-white
			${className}`}
		>
			{children}
		</button>
	);
};

export default Button;
