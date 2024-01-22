import React, { MouseEventHandler } from 'react';
import { MODAL_COMPONENTS } from '../../configs/modalComponents';
import { useModalStore } from '../../stores/useModalStore';
import useModal from '../../hooks/useModal';
import { IPlayer, ISong } from '../../types/types';

interface IModalManagerProps {
	open: boolean;
	style: React.CSSProperties;
	onOpen: MouseEventHandler<HTMLDivElement>;
	onClose: MouseEventHandler<HTMLButtonElement>;
	onMinimize: MouseEventHandler<HTMLButtonElement>;
	currentSongIndex: number;
	songs: ISong[];
	isLoading: boolean;
	playerRef: React.MutableRefObject<IPlayer | null>;
}

const ModalManager = (props: IModalManagerProps) => {
	const { openedModals } = useModalStore();

	const musicModal = useModal({ isOpen: true, isMinimized: false, zIndex: 5 }, 'music');
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

				const combinedProps = { ...modalProps, ...props };

				return <ModalComponent key={modalType} {...combinedProps} />;
			})}
		</>
	);
};

export default ModalManager;
