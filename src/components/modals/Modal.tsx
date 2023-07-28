import React from 'react';
import ModalHeader from './ModalHeader';

interface IModalComponentProps {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
	title: string;
}

const Modal = ({ open, onClose, children, title }: IModalComponentProps) => {
	if (!open) return null;

	return (
		<div className="outsetShadowStyle p-[3px] laptop:w-[610px]">
			<ModalHeader title={title} onClose={onClose} />
			{children}
		</div>
	);
};

export default Modal;
