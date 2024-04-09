import React from 'react';
import { useModalStore } from '../../stores/useModalStore';
import ModalButton from './ModalButton';
import { ModalType } from '../../types/modalTypes';
import { MODAL_CONFIGS } from '../../configs/modalConfigs';

type MainModalType = Exclude<ModalType, 'addSong' | 'loading'>;

const ModalButtonManager = () => {
	const { modalsState, toggleMinimizeModal, openModal, openedModals } = useModalStore();

	const handleToggleMinimize = (modalType: MainModalType) => () => {
		toggleMinimizeModal(modalType);
	};

	const handleOpenModal = (modalType: MainModalType) => () => {
		openModal(modalType);
	};

	return (
		<>
			{openedModals
				.filter(
					(modalType): modalType is MainModalType =>
						!['addSong', 'loading'].includes(modalType),
				)
				.map((modalType) => {
					const modalInfo = modalsState[modalType];
					if (!modalInfo || !modalInfo.isOpen) return null;
					const config = MODAL_CONFIGS[modalType];
					if (!('icon' in config && 'label' in config)) return null;

					const { icon: Icon, label } = config;
					return (
						<ModalButton
							key={modalType}
							modalType={modalType}
							open={modalInfo.isOpen}
							isMinimized={modalInfo.isMinimized}
							toggleMinimize={handleToggleMinimize(modalType)}
							icon={<Icon />}
							label={label}
							onOpen={handleOpenModal(modalType)}
						/>
					);
				})}
		</>
	);
};

export default ModalButtonManager;
