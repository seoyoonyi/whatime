import React, { useContext, useEffect } from 'react';
import { ModalType } from '../page/MainPage';
import Button from './Button';
import ModalContext from '../contexts/ModalContext';

interface IModalButtonProps {
	modalType: ModalType;
	open: boolean;
	isMinimized: boolean;
	toggleMinimize: () => void;
	icon: string;
	label: string;
}

const ModalButton = ({
	modalType,
	open,
	isMinimized,
	toggleMinimize,
	icon,
	label,
}: IModalButtonProps) => {
	const { currentHighestModal, modalZIndexes } = useContext(ModalContext);

	const isActive = currentHighestModal === modalType;
	const isSecondActive =
		modalZIndexes[modalType] ===
		(currentHighestModal ? modalZIndexes[currentHighestModal] - 1 : -1);

	if (!open) return null;
	return (
		<Button
			onClick={toggleMinimize}
			className={`text-[14px] w-[160px] flex justify-start pt-1 px-1 m-1 font-eng ${
				isActive && !isMinimized
					? 'bg-retroLightGray insetBorderStyle font-bold'
					: isSecondActive && !isMinimized
					? 'bg-retroGray outsetShadowStyle'
					: 'bg-retroGray outsetShadowStyle'
			} `}
		>
			{icon} {label}
		</Button>
	);
};

export default ModalButton;
