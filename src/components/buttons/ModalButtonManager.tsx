import React from 'react';
import { useModalStore } from '../../stores/useModalStore';
import ModalButton from './ModalButton';
import { ModalType } from '../../types/modalTypes';
import { MODAL_CONFIGS } from '../../configs/modalConfigs';

const ModalButtonManager = () => {
	const { modalsState, toggleMinimizeModal, openModal, openedModals } = useModalStore();

	const handleToggleMinimize = (modalType: ModalType) => () => {
		toggleMinimizeModal(modalType);
	};

	const handleOpenModal = (modalType: ModalType) => () => {
		openModal(modalType);
	};

	return (
		<>
			{openedModals
				.filter((modalType) => !['addSong'].includes(modalType))
				.map((modalType) => {
					const modalInfo = modalsState[modalType];
					if (!modalInfo || !modalInfo.isOpen) return null;
					const { icon: Icon, label } = MODAL_CONFIGS[modalType];

					return (
						<ModalButton
							key={modalType}
							modalType={modalType as ModalType}
							open={modalInfo.isOpen}
							isMinimized={modalInfo.isMinimized}
							toggleMinimize={handleToggleMinimize(modalType as ModalType)}
							icon={<Icon />}
							label={label}
							onOpen={handleOpenModal(modalType as ModalType)}
						/>
					);
				})}
		</>
	);
};

export default ModalButtonManager;
