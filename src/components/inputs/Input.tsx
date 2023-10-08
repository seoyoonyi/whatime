import React from 'react';
import { IRegisterProps } from './AuthInput';

interface IInputComponentProps {
	type?: 'text' | 'password' | 'email';
	placeholder?: string;
	inputProps?: IRegisterProps;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	autoFocus?: boolean;
}

const Input = ({
	type = 'text',
	placeholder,
	inputProps,
	onChange,
	autoFocus,
}: IInputComponentProps) => {
	return (
		<input
			type={type}
			placeholder={placeholder}
			{...inputProps}
			onChange={onChange}
			autoFocus={autoFocus}
			className="px-4 py-2 focus:outline-none focus:ring focus:ring-inset focus:ring-retroBlue-500"
		/>
	);
};

export default Input;
