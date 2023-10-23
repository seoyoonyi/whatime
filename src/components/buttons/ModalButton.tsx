import React, { useContext, useEffect } from 'react';
import { ModalType } from '../../page/MainPage';
import Button from './Button';
import ModalContext from '../../contexts/ModalContext';

interface IModalButtonProps {
	modalType: ModalType;
	open: boolean;
	isMinimized: boolean;
	toggleMinimize: () => void;
	icon: React.ReactElement;
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
	const {
		currentHighestModal,
		setCurrentHighestModal,
		modalZIndexes,
		setModalZIndexes,
		incrementZIndex,
		currentHighestZIndex,
	} = useContext(ModalContext);

	const isActive = currentHighestModal === modalType && !isMinimized;

	const buttonStyle = isActive
		? 'bg-retroLightGray border border-t-black border-l-black border-b-white border-r-white font-bold'
		: 'bg-retroGray border bg-retroGray border-b-black border-r-black border-t-white border-l-white';

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
		<Button
			onClick={toggleMinimize}
			className={`text-[14px] w-[160px] flex justify-start pt-1 px-1 m-1 font-eng ${buttonStyle}`}
		>
			<div className="w-5 mr-1">{icon}</div>
			{label}
		</Button>
	);
};

export default React.memo(ModalButton);
