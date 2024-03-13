import React from 'react';
import { MODAL_COMPONENTS } from '../../configs/modalComponents';
import { useModalStore } from '../../stores/useModalStore';
import { IPlayer, ISong } from '../../types/types';
import { ModalType } from '../../types/modalTypes';

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
				const ModalComponent = MODAL_COMPONENTS[modalType as ModalType];
				if (!modalInfo.isOpen) return null;

				const additionalProps = {
					...props,
					open: modalInfo.isOpen,
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

				return <ModalComponent key={modalType} {...additionalProps} />;
			})}
		</>
	);
};

export default ModalManager;
