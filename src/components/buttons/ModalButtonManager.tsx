import React from 'react';
import { useModalStore } from '../../stores/useModalStore';
import ModalButton from './ModalButton';
import { CdMusic, Keys, Drvspace7, Computer } from '@react95/icons';
import { ModalType } from '../../types/modalTypes';

const ModalButtonManager = () => {
	const { modalsState, toggleMinimizeModal, openModal } = useModalStore();

	const modalIcons = {
		music: <CdMusic className="w-auto" />,
		chart: <Drvspace7 className="w-auto" />,
		signIn: <Keys className="w-auto" />,
		signUp: <Computer className="w-auto" />,
	};

	const modalLabels = {
		music: 'Music',
		chart: 'Chart',
		signIn: 'SignIn',
		signUp: 'SignUp',
	};

	const handleToggleMinimize = (modalType: ModalType) => () => {
		toggleMinimizeModal(modalType);
	};

	const handleOpenModal = (modalType: ModalType) => () => {
		openModal(modalType);
	};

	return (
		<>
			{Object.entries(modalsState).map(([modalType, modalInfo]) => {
				if (!modalInfo.isOpen) return null;

				return (
					<ModalButton
						key={modalType}
						modalType={modalType as ModalType}
						open={modalInfo.isOpen}
						isMinimized={modalInfo.isMinimized}
						toggleMinimize={handleToggleMinimize(modalType as ModalType)}
						icon={modalIcons[modalType as ModalType]}
						label={modalLabels[modalType as ModalType]}
						onOpen={handleOpenModal(modalType as ModalType)}
					/>
				);
			})}
		</>
	);
};

export default ModalButtonManager;
