import React from 'react';

interface IOutsetShadowContainerProps {
	children: React.ReactNode;
	className?: string;
}

const OutsetShadowContainer = ({ children, className = '' }: IOutsetShadowContainerProps) => {
	return (
		<div
			className={`border bg-retroGray border-b-black border-r-black border-t-white border-l-white ${className}`}
		>
			{children}
		</div>
	);
};

export default OutsetShadowContainer;
