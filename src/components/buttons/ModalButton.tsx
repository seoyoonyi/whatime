import React, { MouseEvent, useEffect } from 'react';
import { useModalStore } from '../../stores/useModalStore';
import { ModalType } from '../../types/modalTypes';

interface IModalButtonProps {
	modalType: ModalType;
	open: boolean;
	isMinimized: boolean;
	toggleMinimize: (event: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void;

	icon: React.ReactElement;
	label: string;
	onOpen: (event: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void;
}

const defaultState = {
	isOpen: false,
	isMinimized: false,
	zIndex: 5,
};

const ModalButton = ({
	modalType,
	icon,
	label,
	open,
	isMinimized,
	toggleMinimize,
	onOpen,
}: IModalButtonProps) => {
	const {
		modalsState,
		currentHighestModal,
		setModalZIndexes,
		incrementZIndex,
		currentHighestZIndex,
		bringToFront,
	} = useModalStore();

	const modalInfo = modalsState[modalType];
	const isActive = currentHighestModal === modalType && !isMinimized;
	const buttonStyle = isActive
		? 'bg-retroLightGray border-2 border-t-black border-l-black border-b-white border-r-white font-bold'
		: 'bg-retroGray border-2 border-b-black border-r-black border-t-white border-l-white';

	const handleButtonClick = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
		event.stopPropagation();

		if (isActive) {
			if (isMinimized) {
				onOpen(event);
			} else {
				toggleMinimize(event);
			}
		} else {
			if (!open || isMinimized) {
				onOpen(event);
			} else {
				bringToFront(modalType as ModalType);
			}
		}
	};

	useEffect(() => {
		if (open && !isMinimized && modalInfo.zIndex !== currentHighestZIndex) {
			const newZIndex = currentHighestZIndex + 1;
			incrementZIndex();
			setModalZIndexes(modalType, newZIndex);
		}
	}, [open, isMinimized, modalType]);

	if (!open) return null;

	return (
		<button
			onClick={handleButtonClick}
			className={`${buttonStyle} text-[14px] w-[100px] md:w-[120px] lg:w-[140px] xl:w-[160px] flex justify-start pt-1 px-1 m-1 font-eng `}
		>
			<div className="w-5 mr-1">{icon}</div>
			{label}
		</button>
	);
};

export default React.memo(ModalButton);
