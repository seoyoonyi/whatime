import React from 'react';

interface IInsetShadowContainerProps {
	children: React.ReactNode;
	className?: string;
}

const InsetShadowContainer = ({ children, className = '' }: IInsetShadowContainerProps) => {
	return (
		<div
			className={`border bg-retroGray border-t-black border-l-black border-b-white border-r-white ${className}`}
		>
			{children}
		</div>
	);
};

export default InsetShadowContainer;
