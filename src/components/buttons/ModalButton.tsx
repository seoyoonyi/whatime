import React, { MouseEvent, useEffect } from 'react';
import { ModalType } from '../../page/MainPage';
import useModal from '../../hooks/useModal';
import { useModalStore } from '../../stores/useModalStore';

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
	open,
	isMinimized,
	toggleMinimize,
	icon,
	label,
	onOpen,
}: IModalButtonProps) => {
	const {
		currentHighestModal,
		setCurrentHighestModal,
		modalZIndexes,
		setModalZIndexes,
		incrementZIndex,
		currentHighestZIndex,
	} = useModalStore();

	const { bringToFront, modalState } = useModal(defaultState, modalType);

	const isActive = currentHighestModal === modalType && !isMinimized;
	const buttonStyle = isActive
		? 'bg-retroLightGray border-2 border-t-black border-l-black border-b-white border-r-white font-bold'
		: 'bg-retroGray border-2 border-b-black border-r-black border-t-white border-l-white';

	const handleButtonClick = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
		if (isActive) {
			if (isMinimized) {
				onOpen(event);
			} else {
				toggleMinimize(event);
			}
		} else {
			if (!modalState.isOpen || isMinimized) {
				onOpen(event);
			} else {
				bringToFront();
			}
		}
	};

	useEffect(() => {
		if (open && !isMinimized) {
			const newZIndex = currentHighestZIndex + 1;
			incrementZIndex();
			setModalZIndexes({
				...modalZIndexes,
				[modalType]: newZIndex,
			});
			setCurrentHighestModal(modalType);
		} else if (!open || isMinimized) {
			const sortedModals = Object.entries(modalZIndexes)
				.sort(([, zIndexA], [, zIndexB]) => zIndexB - zIndexA)
				.map(([key]) => key);

			const secondHighestModal = sortedModals[1];
			if (secondHighestModal) {
				setCurrentHighestModal(secondHighestModal as ModalType);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open, isMinimized]);

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
