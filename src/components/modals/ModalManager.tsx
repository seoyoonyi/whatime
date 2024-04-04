import React, { Suspense } from 'react';
import { useModalStore } from '../../stores/useModalStore';
import { ModalType } from '../../types/modalTypes';
import { IPlayer, ISong } from '../../types/types';
import { MODAL_CONFIGS } from '../../configs/modalConfigs';
import LoadingModal from './LoadingModal';

interface IModalManagerProps {
	currentSongIndex: number;
	songs: ISong[];
	isLoading: boolean;
	playerRef: React.MutableRefObject<IPlayer | null>;
}

const ModalManager = (props: IModalManagerProps) => {
	const { modalsState, openModal, closeModal, toggleMinimizeModal } = useModalStore();

	return (
		<>
			{Object.entries(modalsState).map(([modalType, modalInfo]) => {
				if (!modalInfo.isOpen || modalInfo.isMinimized) return null;

				const { component: ModalComponent } = MODAL_CONFIGS[modalType as ModalType];

				const additionalProps = {
					...props,
					open: modalInfo.isOpen,
					isMinimized: modalInfo.isMinimized,
					style: { zIndex: modalInfo.zIndex },
					onOpen: (e: React.MouseEvent<HTMLDivElement>) => {
						e.stopPropagation();
						openModal(modalType as ModalType);
					},
					onClose: (e: React.MouseEvent<HTMLButtonElement>) => {
						e.stopPropagation();
						closeModal(modalType as ModalType);
					},
					onMinimize: (e: React.MouseEvent<HTMLButtonElement>) => {
						e.stopPropagation();
						toggleMinimizeModal(modalType as ModalType);
					},
				};

				return (
					<Suspense fallback={<LoadingModal {...additionalProps} />} key={modalType}>
						<ModalComponent key={modalType} {...additionalProps} />
					</Suspense>
				);
			})}
		</>
	);
};

export default ModalManager;
