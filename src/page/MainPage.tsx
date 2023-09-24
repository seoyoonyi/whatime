import React, { useEffect, useContext } from 'react';
import MusicModal from '../components/modals/MusicModal';
import YouTube, { YouTubeProps } from 'react-youtube';
import Button from '../components/Button';
import ChartModal from '../components/modals/ChartModal';
import useModal from '../hooks/useModal';
import ModalButton from '../components/ModalButton';
import axios from 'axios';
import { CdMusic } from '@react95/icons';

import MusicContext, { IMusicContext } from '../contexts/MusicContext';

export type ModalType = 'music' | 'chart';
const apiUrl = process.env.REACT_APP_API_URL as string;

const MainPage = () => {
	const musicModal = useModal({ isOpen: true, isMinimized: false, zIndex: 5 }, 'music');
	const chartModal = useModal(undefined, 'chart');
	const { state, dispatch, playerRef, handleReady, handleStateChange } =
		useContext<IMusicContext>(MusicContext);

	const { songs, currentSongIndex } = state;

	const currentSong = songs[currentSongIndex];
	const opts: YouTubeProps['opts'] = {
		playerVars: {
			autoplay: 1,
			mute: 1,
			controls: 0,
		},
	};

	useEffect(() => {
		const fetchSongs = async () => {
			try {
				const response = await axios.get(apiUrl);
				if (response.data && Array.isArray(response.data.data)) {
					dispatch({ type: 'SET_SONGS', payload: response.data.data });
				} else {
					console.error('Invalid response format.');
					dispatch({ type: 'SET_SONGS', payload: songs });
				}
			} catch (error) {
				console.error('Failed to fetch songs from API, using mock data.', error);
				dispatch({ type: 'SET_SONGS', payload: songs });
			}
		};

		fetchSongs();
	}, [dispatch, songs]);

	useEffect(() => {
		dispatch({ type: 'SET_PREV_DISABLED', payload: false });
		dispatch({ type: 'SET_NEXT_DISABLED', payload: false });

		const timer = setInterval(() => {
			if (playerRef.current) {
				const newCurrentTime = Math.round(playerRef.current.getCurrentTime());
				dispatch({ type: 'SET_CURRENT_TIME', payload: newCurrentTime });
			}
		}, 1000);

		return () => {
			if (playerRef.current) {
				playerRef.current.stopVideo();
				playerRef.current = null;
			}
			clearInterval(timer);
		};
	}, [dispatch, playerRef]);

	return (
		<div className="flex flex-col w-full h-screen bg-black ">
			<main className="relative flex items-center justify-center w-full h-full">
				{musicModal.modalState.isOpen && (
					<MusicModal
						open={musicModal.modalState.isOpen}
						style={{
							zIndex: musicModal.modalState.zIndex,
							display: musicModal.modalState.isMinimized ? 'none' : undefined,
						}}
						onModalClick={musicModal.open}
						onClose={musicModal.close}
						onMinimize={musicModal.toggleMinimize}
						handleChartModalOpen={chartModal.open}
						currentSongIndex={currentSongIndex}
						songs={songs}
						playerRef={playerRef}
					/>
				)}
				{chartModal.modalState.isOpen && (
					<ChartModal
						open={chartModal.modalState.isOpen}
						songs={songs}
						onModalClick={chartModal.open}
						onClose={chartModal.close}
						onMinimize={chartModal.toggleMinimize}
						style={{
							zIndex: chartModal.modalState.zIndex,
							display: chartModal.modalState.isMinimized ? 'none' : undefined,
						}}
					/>
				)}
				<YouTube
					iframeClassName="w-full h-full flex-grow"
					className="w-full h-full pointer-events-none"
					videoId={new URL(currentSong.url).searchParams.get('v') || ''}
					opts={opts}
					onReady={handleReady}
					onStateChange={handleStateChange}
				/>
			</main>

			<footer className="flex items-center w-full px-7 h-9 bg-retroGray">
				<div className="relative flex items-center h-full">
					<Button
						onClick={musicModal.open}
						className={`text-[14px] flex items-center justify-center  font-eng mr-2 border-none w-7 h-7 bar`}
					>
						<div className="w-6">
							<CdMusic className="w-auto" />
						</div>
					</Button>
				</div>
				<div className="flex">
					<ModalButton
						modalType="music"
						open={musicModal.modalState.isOpen}
						isMinimized={musicModal.modalState.isMinimized}
						toggleMinimize={musicModal.toggleMinimize}
						icon="🎧"
						label="Music"
					/>
					<ModalButton
						modalType="chart"
						open={chartModal.modalState.isOpen}
						isMinimized={chartModal.modalState.isMinimized}
						toggleMinimize={chartModal.toggleMinimize}
						icon="📈"
						label="Chart"
					/>
				</div>
			</footer>
		</div>
	);
};

export default MainPage;
