import React from 'react';

import { useCallback } from 'react';

import { YouTubeProps } from 'react-youtube';
import { useMusicStore } from '../stores/useMusicStore';
import { IPlayer } from '../types/types';
interface IUseMusicPlayerProps {
	playerRef: React.MutableRefObject<IPlayer | null>;
}

export const useMusicPlayer = ({ playerRef }: IUseMusicPlayerProps) => {
	const {
		setPlayerLoading,
		setSongLoaded,
		setCurrentSongIndex,
		setPlay,
		setDuration,
		setFirstPlay,
		setPlayButton,
		setMute,
		setCurrentTime,
		isMuted,
		isSongLoaded,
		volume,
		isPlaying,
		isFirstPlay,
		songs,
		currentSongIndex,
		isPrevDisabled,
		isNextDisabled,
	} = useMusicStore((state) => ({
		setPlayerLoading: state.setPlayerLoading,
		setSongLoaded: state.setSongLoaded,
		setCurrentSongIndex: state.setCurrentSongIndex,
		setPlay: state.setPlay,
		setDuration: state.setDuration,
		setFirstPlay: state.setFirstPlay,
		setPlayButton: state.setPlayButton,
		setMute: state.setMute,
		setCurrentTime: state.setCurrentTime,
		isMuted: state.isMuted,
		isSongLoaded: state.isSongLoaded,
		volume: state.volume,
		isPlaying: state.isPlaying,
		isFirstPlay: state.isFirstPlay,
		songs: state.songs,
		currentSongIndex: state.currentSongIndex,
		isPrevDisabled: state.isPrevDisabled,
		isNextDisabled: state.isNextDisabled,
	}));

	const handleReady: YouTubeProps['onReady'] = (event) => {
		playerRef.current = event.target;
		if (playerRef.current) {
			playerRef.current.setVolume(volume);
		}
		setPlayerLoading(false);
		setSongLoaded(true);
		setDuration(event.target.getDuration());
		if (isMuted) {
			event.target.mute();
		} else {
			event.target.unMute();
		}
	};

	const handleStateChange: YouTubeProps['onStateChange'] = (event) => {
		switch (event.data) {
			case 0:
				setPlayerLoading(true);
				setSongLoaded(false);
				setFirstPlay(false);
				handleNextSong();
				break;

			case 1:
				setPlayerLoading(false);
				setDuration(event.target.getDuration());
				setSongLoaded(true);
				break;

			case 2:
				setPlay(false);
				break;

			default:
				break;
		}
	};

	const handlePlayClick = useCallback(() => {
		if (playerRef.current) {
			playerRef.current.playVideo();
			if (isFirstPlay && isMuted) {
				playerRef.current.unMute();
				setMute(false);
			}
			setPlayButton(false);
			setFirstPlay(false);
		}
	}, [playerRef, isFirstPlay, isMuted, setPlayButton, setFirstPlay, setMute]);

	const handlePauseClick = () => {
		if (playerRef.current) {
			playerRef.current.pauseVideo();
			setPlay(false);
			setPlayButton(true);
		}
	};

	const handleNextSong = () => {
		if (!isSongLoaded || isNextDisabled) return;

		setSongLoaded(false);
		setCurrentTime(0);
		let newIndex = currentSongIndex + 1;
		if (newIndex >= songs.length) {
			newIndex = 0;
		}

		setCurrentSongIndex(newIndex);
		setPlay(true);

		if (playerRef.current) {
			const videoId = new URL(songs[newIndex].url).searchParams.get('v') || '';
			playerRef.current.loadVideoById(videoId);
		}

		if (!isFirstPlay && (!isMuted || (!isPlaying && isMuted))) {
			setPlayButton(false);
		}
	};

	const handlePrevSong = () => {
		if (!isSongLoaded || isPrevDisabled) return;

		setSongLoaded(false);
		setCurrentTime(0);
		let newIndex = currentSongIndex - 1;
		if (newIndex < 0) {
			newIndex = songs.length - 1;
		}

		setCurrentSongIndex(newIndex);
		setPlay(true);

		if (playerRef.current) {
			const videoId = new URL(songs[newIndex].url).searchParams.get('v') || '';
			playerRef.current.loadVideoById(videoId);
		}

		if (!isFirstPlay && (!isMuted || (!isPlaying && isMuted))) {
			setPlayButton(false);
		}
	};

	const handleSongClick = (index: number) => {
		setCurrentSongIndex(index);
		if (playerRef.current) {
			const videoId = new URL(songs[index].url).searchParams.get('v') || '';
			playerRef.current.loadVideoById(videoId);
			handlePlayClick();
		}
	};

	const handleTimeUpdate = (newTime: number) => {
		if (playerRef.current) {
			playerRef.current.seekTo(newTime);
			setCurrentTime(newTime);
		}
	};

	return {
		handleReady,
		handleStateChange,
		handlePlayClick,
		handlePauseClick,
		handleNextSong,
		handlePrevSong,
		handleSongClick,
		handleTimeUpdate,
		playerRef,
	};
};

export default useMusicPlayer;
