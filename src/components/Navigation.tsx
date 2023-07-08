import React from 'react';
import NavItem, { INavItemProps } from './NavItem';

interface INavigationProps {
	navItems: INavItemProps[];
}

const Navigation = ({ navItems }: INavigationProps) => {
	return (
		<nav className="py-[5px] pl-[6px]">
			<ul className="flex space-x-[10px] font-eng font-medium">
				{navItems.map((item, index) => (
					<NavItem key={index} shortcut={item.shortcut} label={item.label} />
				))}
			</ul>
		</nav>
	);
};

export default Navigation;
