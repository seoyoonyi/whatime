import React from 'react';

interface IIconWrapperProps {
	icon?: React.ReactElement;
	width?: number;
	height?: number;
}

const IconWrapper: React.FC<IIconWrapperProps & React.HTMLAttributes<HTMLElement>> = ({
	icon,
	width,
	height,
	...props
}) => {
	if (!icon) {
		return null;
	}
	return React.cloneElement(icon, { ...props, width, height });
};

export default IconWrapper;
