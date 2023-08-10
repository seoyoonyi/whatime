import React, { useState, useRef, useEffect } from 'react';
import MusicModal from '../components/modals/MusicModal';
import YouTube, { YouTubeProps } from 'react-youtube';
import newJeans from '../data/newjeans.json';
import { ISong, IPlayer } from '../types/types';
import Button from '../components/Button';
import ChartModal from '../components/modals/ChartModal';

export type ModalType = 'music' | 'chart';
const songs: ISong[] = newJeans;

const MainPage = () => {
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

	// Modal related state
	const [modals, setModals] = useState({
		music: { isOpen: true, isMinimized: false, zIndex: 10 },
		chart: { isOpen: false, isMinimized: false, zIndex: 5 },
	});

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

	const openModal = (type: ModalType) => {
		setModals((prev) => ({
			...prev,
			[type]: {
				...prev[type],
				isOpen: true,
				zIndex: 10,
			},
			[type === 'music' ? 'chart' : 'music']: {
				...prev[type === 'music' ? 'chart' : 'music'],
				zIndex: 5,
			},
		}));
	};

	const closeModal = (type: ModalType) => {
		setModals((prev) => ({
			...prev,
			[type]: { ...prev[type], isOpen: false },
		}));
	};

	const toggleModalMinimize = (type: ModalType) => {
		setModals((prev) => ({
			...prev,
			[type]: { ...prev[type], isMinimized: !prev[type].isMinimized },
		}));
	};

	const getModalStyle = (type: ModalType) => {
		const modalData = modals[type];
		return {
			zIndex: modalData.zIndex,
			display: modalData.isMinimized ? 'none' : undefined,
		};
	};

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
				<MusicModal
					open={modals.music.isOpen}
					onModalClick={() => openModal('music')}
					onClose={() => closeModal('music')}
					onMinimize={() => toggleModalMinimize('music')}
					handleChartModalOpen={() => openModal('chart')}
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
					style={getModalStyle('music')}
				/>

				<ChartModal
					open={modals.chart.isOpen}
					style={getModalStyle('chart')}
					onModalClick={() => openModal('chart')}
					onClose={() => closeModal('chart')}
					onMinimize={() => toggleModalMinimize('chart')}
				/>

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
						onClick={() => openModal('music')}
						className={`text-[14px] flex items-center justify-center  font-eng mr-2 border-none w-7 h-7 bar`}
					>
						<i className="text-[20px] fa fa-headphones-simple"></i>
					</Button>
				</div>
				<div className="flex">
					{modals.music.isOpen && (
						<Button
							onClick={() => toggleModalMinimize('music')}
							className={`text-[14px] w-[160px]  flex justify-start pt-1 px-1 m-1 font-eng  ${
								modals.music.isMinimized
									? 'bg-retroGray outsetShadowStyle'
									: 'bg-retroLightGray insetBorderStyle font-bold'
							} `}
						>
							🎧 Music
						</Button>
					)}
					{modals.chart.isOpen && (
						<Button
							onClick={() => toggleModalMinimize('chart')}
							className={`text-[14px] w-[160px] flex justify-start pt-1 px-1 m-1 font-eng ${
								modals.chart.isMinimized
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
