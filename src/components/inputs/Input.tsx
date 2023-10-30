import React from 'react';
import { IRegisterProps } from './AuthInput';

interface IInputComponentProps {
	type?: 'text' | 'password' | 'email';
	placeholder?: string;
	inputProps?: IRegisterProps;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	autoFocus?: boolean;
	className?: string;
	error?: boolean;
	passwordSafety?: string;
}
const Input = ({
	type = 'text',
	placeholder,
	inputProps,
	onChange,
	autoFocus,
	className = '',
	error = false,
	passwordSafety,
}: IInputComponentProps) => {
	let borderColorClass = '';
	if (passwordSafety) {
		switch (passwordSafety) {
			case 'high':
				borderColorClass = 'border-green';
				break;
			case 'medium':
				borderColorClass = 'border-blue';
				break;
			case 'low':
				borderColorClass = 'border-red';
				break;
			default:
				borderColorClass = 'border-t-black border-l-black border-b-white border-r-white';
				break;
		}
	}

	const errorClass = error
		? 'border-red'
		: 'border-t-black border-l-black border-b-white border-r-white';

	return (
		<input
			type={type}
			placeholder={placeholder}
			{...inputProps}
			onChange={onChange}
			autoFocus={autoFocus}
			className={`px-1 py-1 focus:outline-none focus:ring focus:ring-inset focus:ring-retroBlue-500 border ${borderColorClass} ${errorClass} placeholder:text-slate-400 ${className}`}
		/>
	);
};

export default Input;
