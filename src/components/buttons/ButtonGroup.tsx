import React from 'react';
import Button, { IButtonProps } from './Button';

export interface IButtonGroupProps {
	buttons: IButtonProps[];
	className?: string;
}

const ButtonGroup = ({ buttons, className }: IButtonGroupProps) => {
	return (
		<div className={className}>
			{buttons.map(({ className, onClick, children }, index) => (
				<Button key={index} className={className} onClick={onClick}>
					{children}
				</Button>
			))}
		</div>
	);
};

export default ButtonGroup;
