import React, { useContext } from 'react';
import { ModalType } from '../page/MainPage';
import Button from './Button';
import ModalContext from '../contexts/ModalContext';

interface IModalButtonProps {
	modalType: ModalType;
	open: boolean;
	isMinimized: boolean;
	toggleMinimize: () => void;
	// currentHighestModal: ModalType | null;
	icon: string;
	label: string;
}

const ModalButton = ({
	modalType,
	open,
	isMinimized,
	toggleMinimize,
	// currentHighestModal,
	icon,
	label,
}: IModalButtonProps) => {
	const { currentHighestModal, secondHighestModal } = useContext(ModalContext);

	const isActive = currentHighestModal === modalType;
	const isSecondActive = secondHighestModal === modalType;

	if (!open) return null;
	return (
		<Button
			onClick={toggleMinimize}
			className={`text-[14px] w-[160px] flex justify-start pt-1 px-1 m-1 font-eng ${
				isActive && !isMinimized
					? 'bg-retroLightGray insetBorderStyle font-bold'
					: isSecondActive && !isMinimized
					? 'bg-retroLightGray insetBorderStyle font-bold'
					: 'bg-retroGray outsetShadowStyle'
			} `}
		>
			{icon} {label}
		</Button>
	);
};

export default ModalButton;
