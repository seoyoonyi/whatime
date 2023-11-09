import React, { MouseEventHandler, useRef, useState } from 'react';
import Modal from './Modal';
import Button from '../buttons/Button';

interface IAddSongModal {
	onClose: () => void;
	isOpen: boolean;
}

const AddSongModal = ({ isOpen, onClose }: IAddSongModal) => {
	const AddSongModalRef = useRef(null);
	const [showConfirm, setShowConfirm] = useState(false);

	const handleAddToPlaylist = () => {
		setShowConfirm(true);
	};

	const handleAddToMixtape = () => {
		console.log('Added to mixtape');
	};

	const handleClose = () => {
		setShowConfirm(false);
		onClose();
	};

	if (!isOpen) return null;
	return (
		<Modal
			className="absolute"
			open={isOpen}
			onClose={handleClose}
			modalRef={AddSongModalRef}
			style={{ zIndex: 100 }}
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
