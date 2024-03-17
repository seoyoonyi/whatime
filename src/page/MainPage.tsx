import React, { useEffect, useRef } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import Button from '../components/buttons/Button';
import { CdMusic } from '@react95/icons';
import { useQuery } from '@tanstack/react-query';
import { fetchSongs } from '../api/api';

import { IPlayer, ISong } from '../types/types';
import { getRefetchInterval } from '../utils/utils';
import useMusicPlayer from '../hooks/useMusicPlayer';
import { useMusicStore } from '../stores/useMusicStore';
import ModalButtonManager from '../components/buttons/ModalButtonManager';
import ModalManager from '../components/modals/ModalManager';
import { useModalStore } from '../stores/useModalStore';
import { MODAL_KEYS } from '../configs/modalKeys';
import { ModalType } from '../types/modalTypes';
import mockData from '../data/mock.json';

const MainPage = () => {
	const playerRef = useRef<IPlayer | null>(null);
	const { openModal } = useModalStore();

	const { setSongs, songs, currentSongIndex, setPrevDisabled, setNextDisabled, setCurrentTime } =
		useMusicStore((state) => ({
			setSongs: state.setSongs,
			songs: state.songs,
			currentSongIndex: state.currentSongIndex,
			setPrevDisabled: state.setPrevDisabled,
			setNextDisabled: state.setNextDisabled,
			setCurrentTime: state.setCurrentTime,
		}));

	const { handleReady, handleStateChange } = useMusicPlayer({ playerRef });

	const {
		data: fetchedSongs,
		isLoading,
		error,
	} = useQuery<ISong[], Error>(['songs'], fetchSongs, {
		staleTime: Infinity,
		refetchInterval: getRefetchInterval(),
		onError: (error) => {
			console.error('Fetching songs failed:', error);
			setSongs(mockData.data);
		},
	});

	const currentSong = songs[currentSongIndex];
	const opts: YouTubeProps['opts'] = {
		playerVars: {
			autoplay: 1,
			mute: 1,
			controls: 0,
		},
	};

	const handleOpenMusicModal = () => {
		openModal(MODAL_KEYS.MUSIC as ModalType);
	};

	useEffect(() => {
		if (fetchedSongs) {
			setSongs(fetchedSongs);
		}
	}, [fetchedSongs, setSongs]);

	useEffect(() => {
		setPrevDisabled(false);
		setNextDisabled(false);

		const timer = setInterval(() => {
			if (playerRef.current) {
				const newCurrentTime = Math.round(playerRef.current.getCurrentTime());
				setCurrentTime(newCurrentTime);
			}
		}, 1000);
		return () => {
			if (playerRef.current) {
				playerRef.current.stopVideo();
				playerRef.current = null;
			}
			clearInterval(timer);
		};
	}, [playerRef, setCurrentTime, setNextDisabled, setPrevDisabled]);

	return (
		<div className="flex flex-col w-full h-screen bg-black ">
			<main className="relative flex items-center justify-center w-full h-full">
				<ModalManager
					currentSongIndex={currentSongIndex}
					songs={songs}
					isLoading={isLoading}
					playerRef={playerRef}
				/>

				{currentSong && (
					<YouTube
						iframeClassName="w-full h-full flex-grow"
						className="w-full h-full pointer-events-none"
						videoId={new URL(currentSong.url).searchParams.get('v') || ''}
						opts={opts}
						onReady={handleReady}
						onStateChange={handleStateChange}
					/>
				)}
			</main>

			<footer className="flex items-center w-full h-10 px-7 bg-retroGray">
				<div className="relative flex items-center h-full">
					<Button
						onClick={handleOpenMusicModal}
						className={`text-[14px] flex items-center justify-center  font-eng mr-4 border-none w-7 h-7 after:absolute after:top-1/2 after:-translate-y-1/2 after:right-2 after:w-[3px]  after:h-7 after:bg-retroGray after:border  after:border-b-black after:border-r-black after:border-l-white after:border-t-white`}
					>
						<CdMusic width={24} height={24} />
					</Button>
				</div>
				<div className="flex">
					<ModalButtonManager />
				</div>
			</footer>
		</div>
	);
};

export default MainPage;
