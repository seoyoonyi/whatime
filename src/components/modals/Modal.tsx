import React, { MouseEvent } from 'react';
import ModalHeader from './ModalHeader';

interface IModalComponentProps {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
	title: string;
	className?: string;
	style?: React.CSSProperties;
	onMouseMove?: (e: MouseEvent<HTMLDivElement>) => void;
	onMouseUp?: () => void;
	onMouseDown?: (e: MouseEvent<HTMLDivElement>) => void;
	onMouseLeave?: () => void;
}

const Modal = ({
	open,
	onClose,
	children,
	title,
	className,
	onMouseDown,
	onMouseMove,
	onMouseUp,
	onMouseLeave,
	style,
}: IModalComponentProps) => {
	if (!open) return null;

	return (
		<div
			onMouseMove={onMouseMove}
			onMouseUp={onMouseUp}
			style={style}
			className={`outsetShadowStyle p-[3px] laptop:w-[610px] ${className}`}
		>
			<ModalHeader
				title={title}
				onClose={onClose}
				onMouseDown={onMouseDown}
				onMouseLeave={onMouseLeave}
			/>
			{children}
		</div>
	);
};

export default Modal;
