import React from 'react';

interface IUnderlinedInitialComponentsProps {
	word?: string;
}

const UnderlinedInitial = ({ word }: IUnderlinedInitialComponentsProps) => {
	if (!word) return null;

	const [shortcut, ...label] = word;

	return (
		<>
			<u>{shortcut.toUpperCase()}</u>
			<span>{label.join('')}</span>
		</>
	);
};

export default UnderlinedInitial;
