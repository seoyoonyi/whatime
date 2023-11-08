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
		console.log('Added to Playlist');
	};

	const handleAddToMixtape = () => {
		console.log('Added to mixtape');
	};
	if (!isOpen) return null;
	return (
		<Modal
			className="absolute"
			open={isOpen}
			onClose={onClose}
			modalRef={AddSongModalRef}
			style={{ zIndex: 100 }}
		>
			<div className="flex flex-col px-20 py-10 space-y-1">
				<Button className="w-[192px] py-[2px]" onClick={handleAddToPlaylist}>
					Add to playlist
				</Button>
				<Button className="w-[192px] py-[2px]" onClick={handleAddToMixtape}>
					Add to mixtape
				</Button>
			</div>
		</Modal>
	);
};

export default AddSongModal;
