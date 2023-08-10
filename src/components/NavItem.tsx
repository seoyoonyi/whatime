import React, { MouseEventHandler } from 'react';

export interface INavItemProps {
	shortcut: string;
	label: string;
	onClick?: MouseEventHandler<HTMLLIElement>;
}

const NavItem = ({ shortcut, label, onClick }: INavItemProps) => {
	return (
		<li onClick={onClick} className="cursor-pointer">
			<u>{shortcut}</u>
			<span>{label}</span>
		</li>
	);
};

export default NavItem;
