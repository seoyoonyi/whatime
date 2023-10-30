import React from 'react';
import Input from './Input';
import UnderlinedInitial from '../UnderlinedInitial';

export interface IRegisterProps {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
	ref: React.Ref<HTMLInputElement>;
}

interface IAuthInputComponentProps {
	word?: string;
	type?: 'text' | 'password' | 'email';
	placeholder?: string;
	inputProps?: IRegisterProps;
	customOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	autoFocus?: boolean;
	className?: string;
	error?: boolean;
	passwordSafety?: string;
}

const AuthInput = ({
	word,
	type = 'text',
	placeholder,
	inputProps,
	customOnChange,
	autoFocus,
	className,
	error = false,
	passwordSafety,
}: IAuthInputComponentProps) => {
	return (
		<div>
			<p>
				<UnderlinedInitial word={word} />
			</p>
			<Input
				type={type}
				placeholder={placeholder}
				inputProps={inputProps}
				onChange={customOnChange}
				autoFocus={autoFocus}
				className={`w-full mt-[2px] ${className}`}
				error={error}
				passwordSafety={passwordSafety}
			/>
		</div>
	);
};
export default AuthInput;
