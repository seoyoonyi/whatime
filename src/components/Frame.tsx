import React, { ReactNode, forwardRef } from 'react';

interface IFrame {
	children: ReactNode;
	boxShadow?: 'in' | 'out';
	bg?: 'white' | 'retroGray';
	className?: string;
	style?: React.CSSProperties;
	onModalClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Frame = forwardRef<HTMLDivElement, IFrame>(
	({ children, boxShadow, bg, className, style, onModalClick }, ref) => {
		let boxShadowClass: string | null = '';
		let bgClass: string | null = '';

		switch (boxShadow) {
			case 'in':
				boxShadowClass =
					'border  border-t-black border-l-black border-b-white border-r-white';
				break;
			case 'out':
				boxShadowClass =
					'border border-b-black border-r-black border-t-white border-l-white';
				break;
			default:
				boxShadowClass = null;
		}

		switch (bg) {
			case 'white':
				bgClass = 'bg-white';
				break;
			case 'retroGray':
				bgClass = 'bg-retroGray';
				break;
			default:
				bgClass = null;
		}

		return (
			<div
				className={`${boxShadowClass} ${bgClass} ${className}`}
				ref={ref}
				onClick={onModalClick}
				style={style}
			>
				{children}
			</div>
		);
	},
);
Frame.displayName = 'Frame';

export default Frame;
