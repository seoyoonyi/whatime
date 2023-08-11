import React, { useState, useRef, useEffect } from 'react';
import MusicModal from '../components/modals/MusicModal';
import YouTube, { YouTubeProps } from 'react-youtube';
import newJeans from '../data/newjeans.json';
import { ISong, IPlayer } from '../types/types';
import Button from '../components/Button';
import ChartModal from '../components/modals/ChartModal';
import useModal from '../hooks/useModal';

export type ModalType = 'music' | 'chart';
const songs: ISong[] = newJeans;

const MainPage = () => {
	// Modal related state
	const musicModal = useModal({ isOpen: true, isMinimized: false, zIndex: 10 });
	const chartModal = useModal();

	// Player related states
	const playerRef = useRef<IPlayer | null>(null);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [isMuted, setIsMuted] = useState<boolean>(true);
	const [volume, setVolume] = useState<number>(100);
	const [playerReady, setPlayerReady] = useState<boolean>(false);
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
			setDuration(event.target.getDuration());
		}

		setIsSongLoaded(true);
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
				break;

			default:
				break;
		}
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
		if (currentSongIndex === songs.length - 1) {
			setCurrentSongIndex(0);
			setIsNextDisabled(true);
		} else if (currentSongIndex < songs.length - 1) {
			setCurrentSongIndex(currentSongIndex + 1);
			setIsNextDisabled(true);
		}
		setIsPlaying(true);
		setIsNextDisabled(false);
	};

	const handlePrevSong = async () => {
		if (!isSongLoaded || isPrevDisabled) return;
		setIsSongLoaded(false);
		setSongTransitionLoading(true);
		if (currentSongIndex === 0) {
			setCurrentSongIndex(songs.length - 1);
			setIsPrevDisabled(true);
		} else {
			setCurrentSongIndex(currentSongIndex - 1);
			setIsPrevDisabled(true);
		}
		setIsPlaying(true);
		setIsPrevDisabled(false);
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
		console.log('showModalshowModalshowModal', musicModal.modalState.isOpen);
		console.log('showModalshowModalshowModal', chartModal.modalState.isOpen);
	}, [chartModal, musicModal]);

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
					videoId={new URL(currentSong.audioUrl).searchParams.get('v') || ''}
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
						<i className="text-[20px] fa fa-headphones-simple"></i>
					</Button>
				</div>
				<div className="flex">
					{musicModal.modalState.isOpen && (
						<Button
							onClick={musicModal.toggleMinimize}
							className={`text-[14px] w-[160px]  flex justify-start pt-1 px-1 m-1 font-eng  ${
								musicModal.modalState.isMinimized
									? 'bg-retroGray outsetShadowStyle'
									: 'bg-retroLightGray insetBorderStyle font-bold'
							} `}
						>
							🎧 Music
						</Button>
					)}
					{chartModal.modalState.isOpen && (
						<Button
							onClick={chartModal.toggleMinimize}
							className={`text-[14px] w-[160px] flex justify-start pt-1 px-1 m-1 font-eng ${
								chartModal.modalState.isMinimized
									? 'bg-retroGray outsetShadowStyle'
									: 'bg-retroLightGray insetBorderStyle font-bold'
							} `}
						>
							📈 Chart
						</Button>
					)}
				</div>
			</footer>
		</div>
	);
};

export default MainPage;
