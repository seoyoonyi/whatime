import React from 'react';
import { MODAL_COMPONENTS } from '../../configs/modalComponents';
import { useModalStore } from '../../stores/useModalStore';
import { ModalType } from '../../page/MainPage';

const ModalManager = () => {
	const { modalsState, openedModals, setCurrentHighestModal, setOpenedModals } = useModalStore();

	const bringToFront = (modalType: ModalType) => {
		setCurrentHighestModal(modalType);
	};

	const openModal = (modalType: ModalType) => {
		bringToFront(modalType);
		if (!openedModals.includes(modalType)) {
			setOpenedModals([...openedModals, modalType]);
		}
	};

	const closeModal = (modalType: ModalType) => {
		setOpenedModals(openedModals.filter((m) => m !== modalType));
	};

	const toggleMinimizeModal = (modalType: ModalType) => {};

	return (
		<>
			{openedModals.map((modalType) => {
				const ModalComponent = MODAL_COMPONENTS[modalType];
				const modalState = modalsState[modalType];

				return (
					<ModalComponent
						key={modalType}
						open={modalState.isOpen}
						style={{
							zIndex: modalState.zIndex,
							display: modalState.isMinimized ? 'none' : 'block',
						}}
						onOpen={() => openModal(modalType)}
						onClose={() => closeModal(modalType)}
						onMinimize={() => toggleMinimizeModal(modalType)}
					/>
				);
			})}
		</>
	);
};

export default ModalManager;
