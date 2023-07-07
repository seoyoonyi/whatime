import React, { useEffect, useRef, useState } from 'react';

import mockData from '../../data/mock.json';
import YouTube, { YouTubeProps } from 'react-youtube';
import Modal from './Modal';
import ProgressBar from '../ProgressBar';
import InsetShadowContainer from '../InsetShadowContainer';
import VolumeBar from '../volumebar/VolumeBar';
import Button from '../Button';

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
	getCurrentTime(): number;
	getDuration(): number;
	playVideo: () => void;
	pauseVideo: () => void;
	seekTo: (seconds: number) => void;
	unMute: () => void;
}

interface IMusicPlayerModalProps {
	open: boolean;
	onClose: () => void;
}

const songs: ISong[] = mockData;

const MusicModal = ({ open, onClose }: IMusicPlayerModalProps) => {
	const playerRef = useRef<IPlayer | null>(null);

	const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [duration, setDuration] = useState<number>(0);

	const currentSong = songs[currentSongIndex];

	const opts: YouTubeProps['opts'] = {
		playerVars: {
			autoplay: isPlaying ? 1 : 0,
		},
	};

	const handlePlayClick = () => {
		if (playerRef.current) {
			setIsPlaying(true);
			playerRef.current.unMute();
			playerRef.current.playVideo();
		}
	};

	const handlePauseClick = () => {
		if (playerRef.current) {
			setIsPlaying(false);
			playerRef.current.pauseVideo();
		}
	};

	const handleReady = (event: { target: IPlayer }) => {
		playerRef.current = event.target;
		setDuration(event.target.getDuration());
	};

	const handleTimeUpdate = (newTime: number) => {
		if (playerRef.current) {
			setIsPlaying(false);
			playerRef.current.seekTo(newTime);
			setCurrentTime(newTime);
			setIsPlaying(true);
		}
	};
	const formatTime = (seconds: number): string => {
		if (seconds < 0) seconds = 0;
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	};

	useEffect(() => {
		const timer = setInterval(() => {
			if (playerRef.current && isPlaying) {
				setCurrentTime(Math.round(playerRef.current.getCurrentTime()));
			}
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, [isPlaying]);

	return (
		<Modal open={open} onClose={onClose} title="🎧 Music">
			<div>
				<nav className="py-[5px] pl-[6px]">
					<ul className="flex space-x-[10px] font-eng font-medium">
						<li>
							<u>c</u>
							<span>hart</span>
						</li>
						<li>
							<u>p</u>
							<span>laylist</span>
						</li>
					</ul>
				</nav>

				<InsetShadowContainer className="py-[19px] px-[21px]">
					<div className="flex space-x-[20px]">
						<div className=" flex-shrink-0 w-[218px] h-[122px] bg-black flex justify-center items-center overflow-hidden">
							<img
								className="h-full"
								src={currentSong.thumbnail}
								alt={currentSong.songTitle}
							/>
						</div>
						<div className="w-full">
							<h3 className="text-xl font-semibold font-kor">
								{currentSong.songTitle}
							</h3>
							<p className="text-lg font-semibold font-kor mb-[24px]">
								{currentSong.artist}
							</p>

							<ProgressBar
								duration={duration}
								initialCurrentTime={currentTime}
								onTimeUpdate={handleTimeUpdate}
								onPlayClick={handlePlayClick}
								isPlaying={isPlaying}
								className="h-[4px] mb-[13px]"
							/>

							<div className="flex items-center justify-between">
								<div>{`${formatTime(currentTime)} / ${formatTime(duration)}`}</div>

								<VolumeBar />
							</div>
						</div>
					</div>
					<div className="flex justify-between">
						<Button className="px-[27px]">
							<i className="fa fa-step-backward"></i>
						</Button>

						{isPlaying ? (
							<Button onClick={handlePauseClick} className="px-[27px]">
								<i className="fa fa-pause"></i>
							</Button>
						) : (
							<Button onClick={handlePlayClick} className="px-[27px]">
								<i className="fa fa-play"></i>
							</Button>
						)}
						<Button className="px-[27px]">
							<i className="fa fa-step-forward"></i>
						</Button>
					</div>
					<YouTube
						videoId={new URL(currentSong.url).searchParams.get('v') || ''}
						opts={opts}
						onEnd={() => {
							setIsPlaying(false);
							setTimeout(() => setCurrentTime(duration), 1000);
						}}
						onReady={handleReady}
						// style={{ display: 'none' }}
					/>
				</InsetShadowContainer>
			</div>
		</Modal>
	);
};

export default MusicModal;
