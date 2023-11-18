import create from 'zustand';
import { ISong } from '../types/types';

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
	isPrevDisabled: boolean;
	isNextDisabled: boolean;
	isPlayButton: boolean;
	isFirstPlay: boolean;
	setSongs: (songs: ISong[]) => void;
	setPlay: (isPlaying: boolean) => void;
	setVolume: (volume: number) => void;
	setMute: (isMuted: boolean) => void;
	setPlayerLoading: (loading: boolean) => void;
	setSongLoaded: (loaded: boolean) => void;
	setCurrentSongIndex: (index: number) => void;
	setCurrentTime: (time: number) => void;
	setDuration: (duration: number) => void;
	setPrevDisabled: (disabled: boolean) => void;
	setNextDisabled: (disabled: boolean) => void;
	setPlayButton: (isPlayButton: boolean) => void;
	setFirstPlay: (isFirstPlay: boolean) => void;
}

export const useMusicStore = create<IMusicState>((set) => ({
	songs: [],
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
	setSongs: (songs) => set(() => ({ songs })),
	setPlay: (isPlaying) => set(() => ({ isPlaying })),
	setVolume: (volume) => set(() => ({ volume })),
	setMute: (isMuted) => set(() => ({ isMuted })),
	setPlayerLoading: (playerLoading) => set(() => ({ playerLoading })),
	setSongLoaded: (isSongLoaded) => set(() => ({ isSongLoaded })),
	setCurrentSongIndex: (currentSongIndex) => set(() => ({ currentSongIndex })),
	setCurrentTime: (currentTime) => set(() => ({ currentTime })),
	setDuration: (duration) => set(() => ({ duration })),
	setPrevDisabled: (isPrevDisabled) => set(() => ({ isPrevDisabled })),
	setNextDisabled: (isNextDisabled) => set(() => ({ isNextDisabled })),
	setPlayButton: (isPlayButton) => set(() => ({ isPlayButton })),
	setFirstPlay: (isFirstPlay) => set(() => ({ isFirstPlay })),
}));
