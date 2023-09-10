import React, { useState, useRef, useEffect } from 'react';
import MusicModal from '../components/modals/MusicModal';
import YouTube, { YouTubeProps } from 'react-youtube';
import mock from '../data/mock.json';
import { ISong, IPlayer } from '../types/types';
import Button from '../components/Button';
import ChartModal from '../components/modals/ChartModal';
import useModal from '../hooks/useModal';
import ModalButton from '../components/ModalButton';
import axios from 'axios';
import { CdMusic } from '@react95/icons';

export type ModalType = 'music' | 'chart';
const apiUrl = process.env.REACT_APP_API_URL as string;

const MainPage = () => {
	const musicModal = useModal({ isOpen: true, isMinimized: false, zIndex: 5 }, 'music');
	const chartModal = useModal(undefined, 'chart');

	const [songs, setSongs] = useState<ISong[]>(mock.data);

	// Player related states
	const playerRef = useRef<IPlayer | null>(null);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [isMuted, setIsMuted] = useState<boolean>(true);
	const [volume, setVolume] = useState<number>(100);
	const [, setPlayerReady] = useState<boolean>(false);
	const [playerLoading, setPlayerLoading] = useState<boolean>(true);
	const [isSongLoaded, setIsSongLoaded] = useState<boolean>(false);

	// Song related states
	const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [duration, setDuration] = useState<number>(0);
	const [songTransitionLoading, setSongTransitionLoading] = useState(false);
	const [isPrevDisabled, setIsPrevDisabled] = useState<boolean>(false);
	const [isNextDisabled, setIsNextDisabled] = useState<boolean>(false);

	// UI related states
	const [isPlayButton, setIsPlayButton] = useState<boolean>(true);

	const currentSong = songs[currentSongIndex];
	const opts: YouTubeProps['opts'] = {
		playerVars: {
			autoplay: 1,
			mute: 1,
			controls: 0,
		},
	};

	const handleReady: YouTubeProps['onReady'] = (event) => {
		playerRef.current = event.target;
		if (playerRef.current) {
			playerRef.current.setVolume(volume);
		}
		setPlayerReady(true);
		setPlayerLoading(false);
		setSongTransitionLoading(false);
		setCurrentTime(0);

		if (isMuted) {
			event.target.mute();
		} else {
			event.target.unMute();
		}

		if (event.target.getPlayerState() === YouTube.PlayerState.PLAYING) {
			setIsPlayButton(false);
		} else {
			setIsPlayButton(true);
		}

		setIsSongLoaded(true);
		setSongTransitionLoading(false);
	};

	const handleStateChange: YouTubeProps['onStateChange'] = (event) => {
		switch (event.data) {
			case 0:
				setPlayerLoading(true);
				setIsSongLoaded(false);
				handleNextSong();
				break;

			case 1:
				setPlayerLoading(false);
				setDuration(event.target.getDuration());
				setIsSongLoaded(true);
				setSongTransitionLoading(false);
				break;

			default:
				break;
		}
	};

	const handleSongClick = (index: number) => {
		setCurrentSongIndex(index);
	};

	const handlePlayClick = () => {
		if (playerRef.current) {
			setIsPlaying(true);
			playerRef.current.playVideo();
			if (isMuted) {
				playerRef.current.unMute();
				setIsMuted(false);
			}
			setIsPlayButton(false);
		}
	};

	const handlePauseClick = () => {
		if (playerRef.current) {
			setIsPlaying(false);
			playerRef.current.pauseVideo();
			setIsPlayButton(true);
		}
	};

	const handleNextSong = () => {
		if (!isSongLoaded || isNextDisabled) return;

		setIsSongLoaded(false);
		setSongTransitionLoading(true);

		let newIndex = currentSongIndex + 1;

		if (newIndex >= songs.length) {
			newIndex = 0;
		}

		setCurrentSongIndex(newIndex);
		setIsPlaying(true);

		if (playerRef.current) {
			const videoId = new URL(songs[newIndex].url).searchParams.get('v') || '';
			playerRef.current.loadVideoById(videoId);
		}

		setIsPlayButton(false);
	};

	const handlePrevSong = async () => {
		if (!isSongLoaded || isPrevDisabled) return;

		setIsSongLoaded(false);
		setSongTransitionLoading(true);

		let newIndex = currentSongIndex - 1;

		if (newIndex < 0) {
			newIndex = songs.length - 1;
		}

		setCurrentSongIndex(newIndex);
		setIsPlaying(true);

		if (playerRef.current) {
			const videoId = new URL(songs[newIndex].url).searchParams.get('v') || '';
			playerRef.current.loadVideoById(videoId);
		}

		setIsPlayButton(false);
	};

	const handleTimeUpdate = (newTime: number) => {
		if (playerRef.current) {
			setIsPlaying(false);
			playerRef.current.seekTo(newTime);
			setCurrentTime(newTime);
			setIsPlaying(true);
		}
	};

	useEffect(() => {
		const fetchSongs = async () => {
			try {
				const response = await axios.get(apiUrl);
				if (response.data && Array.isArray(response.data.data)) {
					setSongs(response.data.data);
				} else {
					// eslint-disable-next-line no-console
					console.error('Invalid response format.');
					setSongs(mock.data);
				}
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error('Failed to fetch songs from API, using mock data.', error);
				setSongs(mock.data);
			}
		};

		fetchSongs();
	}, []);

	useEffect(() => {
		setIsPrevDisabled(false);
		setIsNextDisabled(false);

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
	}, []);

	return (
		<div className="flex flex-col w-full h-screen bg-black ">
			<main className="relative flex items-center justify-center w-full h-full">
				{musicModal.modalState.isOpen && (
					<MusicModal
						open={musicModal.modalState.isOpen}
						onModalClick={musicModal.open}
						onClose={musicModal.close}
						onMinimize={musicModal.toggleMinimize}
						handleChartModalOpen={chartModal.open}
						style={{
							zIndex: musicModal.modalState.zIndex,
							display: musicModal.modalState.isMinimized ? 'none' : undefined,
						}}
						isPlaying={isPlaying}
						currentSongIndex={currentSongIndex}
						songs={songs}
						playerRef={playerRef}
						songTransitionLoading={songTransitionLoading}
						isPrevDisabled={isPrevDisabled}
						isNextDisabled={isNextDisabled}
						duration={duration}
						currentTime={currentTime}
						handleTimeUpdate={handleTimeUpdate}
						handlePlayClick={handlePlayClick}
						isMuted={isMuted}
						setIsMuted={setIsMuted}
						volume={volume}
						setVolume={setVolume}
						handlePrevSong={handlePrevSong}
						isPlayButton={isPlayButton}
						handlePauseClick={handlePauseClick}
						handleNextSong={handleNextSong}
						playerLoading={playerLoading}
					/>
				)}
				{chartModal.modalState.isOpen && (
					<ChartModal
						open={chartModal.modalState.isOpen}
						songs={songs}
						onModalClick={chartModal.open}
						onClose={chartModal.close}
						onMinimize={chartModal.toggleMinimize}
						onSongClick={handleSongClick}
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
