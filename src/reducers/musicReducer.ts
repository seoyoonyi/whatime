import { ISong } from '../types/types';

export interface IMusicState {
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
}

export type MusicActions =
	| { type: 'SET_SONGS'; payload: ISong[] }
	| { type: 'SET_PLAY'; payload: boolean }
	| { type: 'SET_VOLUME'; payload: number }
	| { type: 'SET_MUTE'; payload: boolean }
	| { type: 'SET_PLAYER_LOADING'; payload: boolean }
	| { type: 'SET_SONG_LOADED'; payload: boolean }
	| { type: 'SET_CURRENT_SONG_INDEX'; payload: number }
	| { type: 'SET_CURRENT_TIME'; payload: number }
	| { type: 'SET_DURATION'; payload: number }
	| { type: 'SET_SONG_TRANSITION_LOADING'; payload: boolean }
	| { type: 'SET_PREV_DISABLED'; payload: boolean }
	| { type: 'SET_NEXT_DISABLED'; payload: boolean }
	| { type: 'SET_PLAY_BUTTON'; payload: boolean }
	| { type: 'SET_FIRST_PLAY'; payload: boolean };

export const musicReducer = (state: IMusicState, action: MusicActions): IMusicState => {
	switch (action.type) {
		case 'SET_SONGS':
			return { ...state, songs: action.payload };
		case 'SET_PLAY':
			return { ...state, isPlaying: action.payload };
		case 'SET_VOLUME':
			return { ...state, volume: action.payload };
		case 'SET_MUTE':
			return { ...state, isMuted: action.payload };
		case 'SET_PLAYER_LOADING':
			return { ...state, playerLoading: action.payload };
		case 'SET_SONG_LOADED':
			return { ...state, isSongLoaded: action.payload };
		case 'SET_CURRENT_SONG_INDEX':
			return { ...state, currentSongIndex: action.payload };
		case 'SET_CURRENT_TIME':
			return { ...state, currentTime: action.payload };
		case 'SET_DURATION':
			return { ...state, duration: action.payload };
		case 'SET_SONG_TRANSITION_LOADING':
			return { ...state, songTransitionLoading: action.payload };
		case 'SET_PREV_DISABLED':
			return { ...state, isPrevDisabled: action.payload };
		case 'SET_NEXT_DISABLED':
			return { ...state, isNextDisabled: action.payload };
		case 'SET_PLAY_BUTTON':
			return { ...state, isPlayButton: action.payload };
		case 'SET_FIRST_PLAY':
			return { ...state, isFirstPlay: action.payload };
		default:
			return state;
	}
};
