import React from 'react';
import { MODAL_COMPONENTS } from '../../configs/modalComponents';
import { useModalStore } from '../../stores/useModalStore';
import useModal from '../../hooks/useModal';

const ModalManager = () => {
	const { openedModals } = useModalStore();

	const musicModal = useModal(undefined, 'music');
	const chartModal = useModal(undefined, 'chart');
	const signInModal = useModal(undefined, 'signIn');
	const signUpModal = useModal(undefined, 'signUp');

	return (
		<>
			{openedModals.map((modalType) => {
				const ModalComponent = MODAL_COMPONENTS[modalType];
				const modalProps = {
					music: musicModal,
					chart: chartModal,
					signIn: signInModal,
					signUp: signUpModal,
				}[modalType];
				return (
					<ModalComponent
						key={modalType}
						open={modalProps.modalState.isOpen}
						style={{
							zIndex: modalProps.modalState.zIndex,
							display: modalProps.modalState.isMinimized ? 'none' : 'block',
						}}
						onOpen={modalProps.open}
						onClose={modalProps.close}
						onMinimize={modalProps.toggleMinimize}
					/>
				);
			})}
		</>
	);
};

export default ModalManager;
