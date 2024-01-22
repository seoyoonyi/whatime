import React from 'react';
import { useModalStore } from '../../stores/useModalStore';
import ModalButton from '../buttons/ModalButton';
import { CdMusic, Keys, Drvspace7, Computer } from '@react95/icons';
import useModal from '../../hooks/useModal';
import { ModalType } from '../../page/MainPage';

const ModalButtonManager = () => {
	const { openedModals } = useModalStore();
	const musicModal = useModal({ isOpen: true, isMinimized: false, zIndex: 5 }, 'music');
	const chartModal = useModal(undefined, 'chart');
	const signInModal = useModal(undefined, 'signIn');
	const signUpModal = useModal(undefined, 'signUp');

	const getModalInfo = (modalType: ModalType) => {
		switch (modalType) {
			case 'music':
				return {
					isOpen: musicModal.modalState.isOpen,
					isMinimized: musicModal.modalState.isMinimized,
					toggleMinimize: musicModal.toggleMinimize,
					icon: <CdMusic className="w-auto" />,
					label: 'Music',
					onOpen: musicModal.open,
				};
			case 'chart':
				return {
					isOpen: chartModal.modalState.isOpen,
					isMinimized: chartModal.modalState.isMinimized,
					toggleMinimize: chartModal.toggleMinimize,
					icon: <Drvspace7 className="w-auto" />,
					label: 'Chart',
					onOpen: chartModal.open,
				};
			case 'signIn':
				return {
					isOpen: signInModal.modalState.isOpen,
					isMinimized: signInModal.modalState.isMinimized,
					toggleMinimize: signInModal.toggleMinimize,
					icon: <Keys className="w-auto" />,
					label: 'SignIn',
					onOpen: signInModal.open,
				};
			case 'signUp':
				return {
					isOpen: signUpModal.modalState.isOpen,
					isMinimized: signUpModal.modalState.isMinimized,
					toggleMinimize: signUpModal.toggleMinimize,
					icon: <Computer className="w-auto" />,
					label: 'SignUp',
					onOpen: signUpModal.open,
				};
			default:
				throw new Error('Unknown modal type: ' + modalType);
		}
	};

	return (
		<>
			{openedModals.map((modalType) => {
				const modalInfo = getModalInfo(modalType);

				return (
					<ModalButton
						key={modalType}
						modalType={modalType}
						open={modalInfo.isOpen}
						isMinimized={modalInfo.isMinimized}
						toggleMinimize={modalInfo.toggleMinimize}
						icon={modalInfo.icon}
						label={modalInfo.label}
						onOpen={modalInfo.onOpen}
					/>
				);
			})}
		</>
	);
};

export default ModalButtonManager;
