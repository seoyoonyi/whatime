import React from 'react';
import Input from './Input';
import UnderlinedInitial from '../UnderlinedInitial';

interface IAuthInputComponentProps {
	word: string;
	type?: 'text';
	placeholder?: string;
}

const AuthInput = ({ word, type, placeholder }: IAuthInputComponentProps) => {
	return (
		<div>
			<p>
				<UnderlinedInitial word={word} />
			</p>
			<Input type={type} placeholder={placeholder} />
		</div>
	);
};

export default AuthInput;
