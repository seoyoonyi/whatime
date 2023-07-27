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
	stopVideo(): () => void;
	setVolume: (arg0: number) => void;
	getCurrentTime(): number;
	getDuration(): number;
	playVideo: () => void;
	pauseVideo: () => void;
	seekTo: (seconds: number) => void;
	mute: () => void;
	unMute: () => void;
	on: (event: string, callback: () => void) => void;
}
