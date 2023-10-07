import React from 'react';

interface IInputComponentProps {
	type?: 'text';
	placeholder?: string;
}

const Input = ({ type = 'text', placeholder }: IInputComponentProps) => {
	return <input type={type} placeholder={placeholder} />;
};

export default Input;
