import React, { useState } from 'react';
// import mockData from '../../data/mock.json';
import YouTube from 'react-youtube';
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
	{
		id: 2,
		rank: 2,
		songTitle: 'Pink Venom',
		artist: 'BLACKPINK',
		thumbnail: 'https://i.ytimg.com/vi/gQlMMD8auMs/default.jpg',
		duration: '3:13',
		viewCount: 1234123,
		url: 'https://www.youtube.com/watch?v=gQlMMD8auMs',
		releaseDate: '2023-01-01',
	},
];

const MusicPlayerModal = ({ open, onClose }: IMusicPlayerModalProps) => {
	const [currentSong, setCurrentSong] = useState<string>('');
	const [isPlaying, setIsPlaying] = useState<boolean>(false);

	const handlePlayClick = (url: string) => {
		const videoId = new URL(url).searchParams.get('v'); // Get video ID from URL
		setCurrentSong(videoId || '');
		setIsPlaying(true);
	};

	const handlePauseClick = () => {
		setIsPlaying(false);
	};

	const opts = {
		playerVars: {
			autoplay: isPlaying ? 1 : 0, // If isPlaying is true, set autoplay to 1. Otherwise, set to 0.
		},
	};

	return (
		<Modal open={open} onClose={onClose}>
			<div className="flex">
				{songs.map((song) => (
					<div key={song.id}>
						<img src={song.thumbnail} alt={song.songTitle} />
						<div>{song.songTitle}</div>
						<div>{song.artist}</div>
						<button onClick={() => handlePlayClick(song.url)}>Play</button>
						<button onClick={handlePauseClick}>Pause</button>
					</div>
				))}
			</div>
			{currentSong && (
				<YouTube videoId={currentSong} opts={opts} onEnd={() => setIsPlaying(false)} />
			)}
		</Modal>
	);
};

export default MusicPlayerModal;
