import React, { useContext, useEffect } from 'react';
import { ModalType } from '../../page/MainPage';
import ModalContext from '../../contexts/ModalContext';
import useModal from '../../hooks/useModal';

interface IModalButtonProps {
	modalType: ModalType;
	open: boolean;
	isMinimized: boolean;
	toggleMinimize: () => void;
	icon: React.ReactElement;
	label: string;
	onModalClick: () => void;
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
	onModalClick,
}: IModalButtonProps) => {
	const {
		currentHighestModal,
		setCurrentHighestModal,
		modalZIndexes,
		setModalZIndexes,
		incrementZIndex,
		currentHighestZIndex,
	} = useContext(ModalContext);

	const {
		bringToFront,
		open: openModal,
		modalState,
		isAllMinimized,
	} = useModal(defaultState, modalType);

	const isActive = currentHighestModal === modalType && !isMinimized;
	const buttonStyle = isActive
		? 'bg-retroLightGray border-2 border-t-black border-l-black border-b-white border-r-white font-bold'
		: 'bg-retroGray border-2 border-b-black border-r-black border-t-white border-l-white';

	const handleButtonClick = () => {
		if (isActive) {
			if (isMinimized) {
				onModalClick();
			} else {
				toggleMinimize();
			}
		} else {
			if (!modalState.isOpen || isMinimized) {
				onModalClick();
			} else {
				bringToFront();
			}
		}
	};

	useEffect(() => {
		if (open && !isMinimized) {
			incrementZIndex();
			setModalZIndexes((prevState) => ({
				...prevState,
				[modalType]: currentHighestZIndex + 1,
			}));
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
			className={`${buttonStyle} text-[14px] w-[160px] flex justify-start pt-1 px-1 m-1 font-eng `}
		>
			<div className="w-5 mr-1">{icon}</div>
			{label}
		</button>
	);
};

export default React.memo(ModalButton);
