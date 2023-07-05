import React, { useState } from 'react';
import MusicModal from '../components/modals/MusicModal';

const MainPage = () => {
	const [isMusicModalOpen, setIsMusicModalOpen] = useState(true);

	const handleModalOpen = () => {
		setIsMusicModalOpen(true);
	};

	const handleModalClose = () => {
		setIsMusicModalOpen(false);
	};

	return (
		<div>
			<h1>Main Page</h1>
			<button onClick={handleModalOpen}>Music</button>

			<MusicModal open={isMusicModalOpen} onClose={handleModalClose} />
		</div>
	);
};

export default MainPage;
