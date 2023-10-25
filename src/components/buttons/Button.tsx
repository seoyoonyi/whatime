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
			className={`border-2 ${className} ${
				disabled
					? 'cursor-not-allowed opacity-50'
					: 'border-l-white border-t-white border-r-black border-b-black'
			} bg-retroGray active:border-t-black active:border-l-black active:border-b-white active:border-r-white`}
		>
			{children}
		</button>
	);
};

export default Button;
