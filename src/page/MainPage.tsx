import React, { useState, useRef, useEffect } from 'react';
import MusicModal from '../components/modals/MusicModal';
import YouTube, { YouTubeProps } from 'react-youtube';
import newJeans from '../data/newjeans.json';
import { ISong, IPlayer } from '../types/types';

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
	const [isMusicModalOpen, setIsMusicModalOpen] = useState(true);

	const currentSong = songs[currentSongIndex];
	const opts: YouTubeProps['opts'] = {
		playerVars: {
			autoplay: 1,
			mute: 1,
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

	const handleMusicModalOpen = () => {
		setIsMusicModalOpen(true);
	};

	const handleMusicModalClose = () => {
		setIsMusicModalOpen(false);
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
		<div>
			<h1>Main Page</h1>
			<button onClick={handleMusicModalOpen}>Music</button>

			<MusicModal
				open={isMusicModalOpen}
				onClose={handleMusicModalClose}
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

			<YouTube
				videoId={new URL(currentSong.audioUrl).searchParams.get('v') || ''}
				opts={opts}
				onReady={handleReady}
				onStateChange={handleStateChange}
			/>
		</div>
	);
};

export default MainPage;
