import React, { MouseEventHandler, useRef } from 'react';
import Modal from './Modal';
import { MODAL_CONFIGS } from '../../configs/modalConfigs';
import { ModalType } from '../../types/modalTypes';
interface ILoadingModalProps {
	open: boolean;
	style: React.CSSProperties;
	onClose: MouseEventHandler<HTMLButtonElement>;
}

const LoadingModal = ({ open, style, onClose }: ILoadingModalProps) => {
	const loadingModalRef = useRef(null);
	const { key } = MODAL_CONFIGS.loading;
	const safeZIndex = typeof style.zIndex === 'number' ? style.zIndex + 2 : 9999;

	const updatedStyle = {
		...style,
		zIndex: safeZIndex,
	};

	return (
		<div style={updatedStyle} className="fixed inset-0 flex items-center justify-center">
			<Modal
				open={open}
				onClose={onClose}
				modalRef={loadingModalRef}
				modalKey={key as ModalType}
			>
				<div className="flex items-center justify-center w-[289px] h-[150px] text-black">
					<span className="w-[30px]">
						<img className="w-full" src="/hourglass.webp" alt="Loading..." />
					</span>
					<p>Loading...</p>
				</div>
			</Modal>
		</div>
	);
};

export default LoadingModal;
