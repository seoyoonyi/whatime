import React, { useState } from 'react';
import MusicPlayerModal from '../components/modals/MusicPlayerModal';

const MainPage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleModalOpen = () => {
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	return (
		<div>
			<h1>Main Page</h1>
			<button onClick={handleModalOpen}>Open Music Player</button>

			<MusicPlayerModal open={isModalOpen} onClose={handleModalClose} />
		</div>
	);
};

export default MainPage;
