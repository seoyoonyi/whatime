import React, { CSSProperties, MouseEventHandler, useRef, useState } from 'react';
import Modal from './Modal';
import Button from '../buttons/Button';
import { ModalType } from '../../types/modalTypes';
import { MODAL_CONFIGS } from '../../configs/modalConfigs';

interface IAddSongModal {
	open: boolean;
	onClose: MouseEventHandler<HTMLButtonElement>;
	style: CSSProperties;
}

const AddSongModal = ({ open, onClose, style }: IAddSongModal) => {
	const AddSongModalRef = useRef(null);
	const { key } = MODAL_CONFIGS.addSong;

	const [showConfirm, setShowConfirm] = useState(false);

	const handleAddToPlaylist = () => {
		setShowConfirm(true);
	};

	const handleAddToMixtape = () => {
		console.log('Added to mixtape');
	};

	const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
		setShowConfirm(false);
		onClose(event);
	};

	if (!open) return null;
	return (
		<Modal
			className="absolute"
			open={open}
			onClose={handleClose}
			modalRef={AddSongModalRef}
			style={style}
			modalKey={key as ModalType}
		>
			<div className="flex flex-col justify-center px-20 py-10 space-y-1">
				{showConfirm ? (
					<>
						<h4 className="pb-2">Added 1 song to the playlist.</h4>
						<Button className="w-[192px] py-[2px]" onClick={handleAddToMixtape}>
							Confirm
						</Button>
					</>
				) : (
					<>
						<Button className="w-[192px] py-[2px]" onClick={handleAddToPlaylist}>
							Add to playlist
						</Button>
						<Button className="w-[192px] py-[2px]" onClick={handleAddToMixtape}>
							Add to mixtape
						</Button>
					</>
				)}
			</div>
		</Modal>
	);
};

export default AddSongModal;
