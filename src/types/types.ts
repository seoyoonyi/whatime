export interface ISong {
	id: number;
	ranking: string;
	url: string;
	musicTitle: string;
	artist: string;
	thumbnail: string;
	duration: string;
	viewCount: string;
	releaseDate: string;
	rankDate: string;
}

export interface IPlayer {
	disableCaptions(): unknown;
	loadVideoById(videoId: string): unknown;
	unloadModule(arg0: string): unknown;
	play(): unknown;
	src: string;
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
	destroy(): void;
}
