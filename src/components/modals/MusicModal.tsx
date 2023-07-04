import React, { useRef, useState } from 'react';

// import mockData from '../../data/mock.json';
import YouTube, { YouTubeProps } from 'react-youtube';
import Modal from './Modal';

interface ISong {
	id: number;
	rank: number;
	songTitle: string;
	artist: string;
	thumbnail: string;
	duration: string;
	viewCount: number;
	url: string;
	releaseDate: string;
}
interface IPlayer {
	playVideo: () => void;
	pauseVideo: () => void;
}
interface IMusicPlayerModalProps {
	open: boolean;
	onClose: () => void;
}

const songs: ISong[] = [
	{
		id: 1,
		rank: 1,
		songTitle: 'Jenga(feat. GAEKO)',
		artist: 'Heize(헤이즈)',
		thumbnail:
			'https://lh3.googleusercontent.com/jxsyG-455VfZ0oK-QE-WHtVNGDYgVyWMb2JYJJYcmoJVsQE9VFOT7R8MFgvec3ZoVaGiYCymepe_M0ED8A=w544-h544-l90-rj',
		duration: '3:31',
		viewCount: 2932983,
		url: 'https://www.youtube.com/watch?v=uw_HR9jIJww',
		releaseDate: '2018-03-08',
	},
];

const MusicPlayerModal = ({ open, onClose }: IMusicPlayerModalProps) => {
	const playerRef = useRef<IPlayer | null>(null);

	const [currentSong, setCurrentSong] = useState<string>('');
	const [isPlaying, setIsPlaying] = useState<boolean>(false);

	const opts: YouTubeProps['opts'] = {
		playerVars: {
			autoplay: isPlaying ? 1 : 0,
		},
	};

	const handlePlayClick = (url: string) => {
		const videoId = new URL(url).searchParams.get('v');
		setCurrentSong(videoId || '');
		setIsPlaying(true);
		playerRef.current?.playVideo();
	};

	const handlePauseClick = () => {
		setIsPlaying(false);
		playerRef.current?.pauseVideo();
	};

	const handleReady = (event: { target: IPlayer }) => {
		playerRef.current = event.target;
	};

	return (
		<Modal open={open} onClose={onClose}>
			{songs.map((song) => (
				<div key={song.id}>
					<img src={song.thumbnail} alt={song.songTitle} />
					<div>{song.songTitle}</div>
					<div>{song.artist}</div>

					<div className="flex justify-between">
						<button>
							<i className="fa fa-backward"></i>
						</button>
						{isPlaying ? (
							<button onClick={handlePauseClick}>
								<i className="fa fa-pause"></i>
							</button>
						) : (
							<button onClick={() => handlePlayClick(song.url)}>
								<i className="fa fa-play"></i>
							</button>
						)}
						<button>
							<i className="fa fa-forward"></i>
						</button>
					</div>
				</div>
			))}

			{currentSong && (
				<YouTube
					videoId={currentSong}
					opts={opts}
					onEnd={() => setIsPlaying(false)}
					onReady={handleReady}
				/>
			)}
		</Modal>
	);
};

export default MusicPlayerModal;
