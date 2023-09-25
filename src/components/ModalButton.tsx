import React, { useContext, useEffect } from 'react';
import { ModalType } from '../page/MainPage';
import Button from './Button';
import ModalContext from '../contexts/ModalContext';

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
	const { currentHighestModal, modalsState, setCurrentHighestModal } = useContext(ModalContext);

	const isActive = currentHighestModal === modalType;

	const buttonStyle = isActive
		? 'bg-retroLightGray insetBorderStyle font-bold'
		: 'bg-retroGray outsetShadowStyle';

	useEffect(() => {
		if (isActive && isMinimized) {
			const sortedModals = Object.entries(modalsState).sort(
				([, zIndexA], [, zIndexB]) =>
					(zIndexB as unknown as number) - (zIndexA as unknown as number),
			);
			const nextHighestModal = sortedModals[1];
			if (nextHighestModal) {
				setCurrentHighestModal(nextHighestModal[0] as ModalType);
			}
		}
	}, [isActive, isMinimized, modalsState, setCurrentHighestModal, currentHighestModal]);

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

export default ModalButton;
