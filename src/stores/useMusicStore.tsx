import create from 'zustand';
import { YouTubeProps } from 'react-youtube';
import { ISong, IPlayer } from '../types/types';
import mock from '../data/mock.json';

interface IMusicState {
	songs: ISong[];
	isPlaying: boolean;
	isMuted: boolean;
	volume: number;
	playerLoading: boolean;
	isSongLoaded: boolean;
	currentSongIndex: number;
	currentTime: number;
	duration: number;
	songTransitionLoading: boolean;
	isPrevDisabled: boolean;
	isNextDisabled: boolean;
	isPlayButton: boolean;
	isFirstPlay: boolean;
	playerRef: IPlayer | null;

	setPlayerRef: (player: IPlayer | null) => void;
	handleReady: YouTubeProps['onReady'];
	handleStateChange: YouTubeProps['onStateChange'];
	handleSongClick: (index: number) => void;
	handlePlayClick: () => void;
	handlePauseClick: () => void;
	handleNextSong: () => void;
	handlePrevSong: () => void;
	handleTimeUpdate: (newTime: number) => void;
}

const useMusicStore = create<IMusicState>((set, get) => ({
	songs: mock.data,
	isPlaying: false,
	isMuted: true,
	volume: 100,
	playerLoading: true,
	isSongLoaded: false,
	currentSongIndex: 0,
	currentTime: 0,
	duration: 0,
	songTransitionLoading: false,
	isPrevDisabled: false,
	isNextDisabled: false,
	isPlayButton: true,
	isFirstPlay: true,
	playerRef: null,

	setPlayerRef: (player) => set({ playerRef: player }),

	handleReady: (event) => {
		const { volume, isMuted } = get();
		const player = event.target;
		set({
			playerRef: player,
			playerLoading: false,
			songTransitionLoading: false,
			currentTime: 0,
			duration: player.getDuration(),
			isSongLoaded: true,
			isPlaying: true,
		});
		if (isMuted) {
			player.mute();
		} else {
			player.unMute();
		}
	},

	handleStateChange: (event) => {
		const { currentSongIndex, songs } = get();
		switch (event.data) {
			case 0:
				set({ playerLoading: true, isSongLoaded: false, isFirstPlay: false });
				get().handleNextSong();
				break;

			case 1:
				set({
					playerLoading: false,
					duration: event.target.getDuration(),
					isSongLoaded: true,
					songTransitionLoading: false,
				});
				break;

			case 2:
				set({ isPlaying: false });
				break;

			default:
				break;
		}
	},

	handlePlayClick: () => {
		const { playerRef, isFirstPlay, isMuted } = get();
		if (playerRef) {
			playerRef.playVideo();
			if (isFirstPlay && isMuted) {
				playerRef.unMute();
				set({ isMuted: false });
			}
			set({ isPlayButton: false, isFirstPlay: false });
		}
	},

	handlePauseClick: () => {
		const playerRef = get().playerRef;
		if (playerRef) {
			set({ isPlaying: false });
			playerRef.pauseVideo();
			set({ isPlayButton: true });
		}
	},

	handleNextSong: () => {
		const { currentSongIndex, songs, isSongLoaded, isNextDisabled, playerRef } = get();
		if (!isSongLoaded || isNextDisabled) return;

		let newIndex = currentSongIndex + 1;
		if (newIndex >= songs.length) newIndex = 0;

		const videoId = new URL(songs[newIndex].url).searchParams.get('v') || '';
		if (playerRef) playerRef.loadVideoById(videoId);

		set({
			currentSongIndex: newIndex,
			isSongLoaded: false,
			songTransitionLoading: true,
			isPlayButton: false,
			isPlaying: true,
		});
	},

	handlePrevSong: () => {
		const { currentSongIndex, songs, isSongLoaded, isPrevDisabled, playerRef } = get();

		if (!isSongLoaded || isPrevDisabled) return;

		let newIndex = currentSongIndex - 1;
		if (newIndex < 0) newIndex = songs.length - 1;

		const videoId = new URL(songs[newIndex].url).searchParams.get('v') || '';
		if (playerRef) playerRef.loadVideoById(videoId);

		set({
			currentSongIndex: newIndex,
			isSongLoaded: false,
			songTransitionLoading: true,
			isPlayButton: false,
			isPlaying: true,
		});
	},

	handleSongClick: (index: number) => {
		const { songs, playerRef } = get();
		const videoId = new URL(songs[index].url).searchParams.get('v') || '';
		if (playerRef) {
			playerRef.loadVideoById(videoId);
			get().handlePlayClick();
		}
		set({ currentSongIndex: index });
	},

	handleTimeUpdate: (newTime: number) => {
		const playerRef = get().playerRef;
		if (playerRef) {
			playerRef.seekTo(newTime);
			set({ currentTime: newTime, isPlaying: true });
		}
	},
}));

export default useMusicStore;
