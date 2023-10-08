import React from 'react';
import Input from './Input';
import UnderlinedInitial from '../UnderlinedInitial';

export interface IRegisterProps {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
	ref: React.Ref<HTMLInputElement>;
}

interface IAuthInputComponentProps {
	word: string;
	type?: 'text' | 'password' | 'email';
	placeholder?: string;
	inputProps?: IRegisterProps;
	customOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	autoFocus?: boolean;
}

const AuthInput = ({
	word,
	type = 'text',
	placeholder,
	inputProps,
	customOnChange,
	autoFocus,
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
			/>
		</div>
	);
};

export default AuthInput;
