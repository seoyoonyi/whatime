import React from 'react';

export interface INavItemProps {
	shortcut: string;
	label: string;
}

const NavItem = ({ shortcut, label }: INavItemProps) => {
	return (
		<li>
			<u>{shortcut}</u>
			<span>{label}</span>
		</li>
	);
};

export default NavItem;
