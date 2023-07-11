export interface ISong {
	title: string;
	thumbnail: string;
	videoId: string;
	audioUrl: string;
	duration: string;
	releaseDate: string;
	viewCount: number;
	likes: string;
	comments: string;
}

export interface IPlayer {
	setVolume(arg0: number): unknown;
	getCurrentTime(): number;
	getDuration(): number;
	playVideo: () => void;
	pauseVideo: () => void;
	seekTo: (seconds: number) => void;
	mute: () => void;
	unMute: () => void;
	on: (event: string, callback: () => void) => void;
}
