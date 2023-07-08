import React, { useEffect, useRef, useState } from 'react';
import mockData from '../../data/mock.json';
import YouTube, { YouTubeProps } from 'react-youtube';
import Modal from './Modal';
import ProgressBar from '../ProgressBar';
import InsetShadowContainer from '../InsetShadowContainer';
import VolumeBar from '../volumebar/VolumeBar';
import Button, { IButtonProps } from '../Button';
import ButtonGroup from '../ButtonGroup';
import { INavItemProps } from '../NavItem';
import Navigation from '../Navigation';

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

interface IMusicPlayerModalProps {
	open: boolean;
	onClose: () => void;
}

const songs: ISong[] = mockData;

const MusicModal = ({ open, onClose }: IMusicPlayerModalProps) => {
	const playerRef = useRef<IPlayer | null>(null);
	const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [isMuted, setIsMuted] = useState<boolean>(true);
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [duration, setDuration] = useState<number>(0);
	const [playerReady, setPlayerReady] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	const currentSong = songs[currentSongIndex];
	const opts: YouTubeProps['opts'] = {
		playerVars: {
			autoplay: 1,
			mute: 1,
		},
	};

	if (!currentSong) {
		return <div>No song selected</div>;
	}

	const handleReady: YouTubeProps['onReady'] = (event) => {
		playerRef.current = event.target;
		setDuration(event.target.getDuration());
		setPlayerReady(true);
		setLoading(false);
	};

	const handleStateChange: YouTubeProps['onStateChange'] = (event) => {
		if (event.data === 1) {
			setLoading(false);
		}
	};
	const handlePlayClick = () => {
		if (playerRef.current) {
			setIsPlaying(true);
			playerRef.current.playVideo();
			if (isMuted) {
				playerRef.current.unMute();
				setIsMuted(false);
			}
		}
	};

	const handlePauseClick = () => {
		if (playerRef.current) {
			setIsPlaying(false);
			playerRef.current.pauseVideo();
		}
	};

	const handleBackwardClick = () => {
		if (currentSongIndex === 0) {
			/*  코드를 통해 이전 버튼을 클릭하면 마지막 노래로 이동하는 기능 구현 */
			// setCurrentSongIndex(songs.length - 1);
			alert('This is the first song.');
		} else {
			setCurrentSongIndex(currentSongIndex - 1);
		}
		setIsPlaying(true);
	};

	const handleForwardClick = () => {
		if (currentSongIndex === songs.length - 1) {
			/*  코드를 통해 다음 버튼을 클릭하면 첫 노래로 이동하는 기능 구현 */
			// setCurrentSongIndex(0);
			alert('This is the last song.');
		} else {
			setCurrentSongIndex(currentSongIndex + 1);
		}
		setIsPlaying(true);
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

	const musicModalnavItems: INavItemProps[] = [
		{ shortcut: 'c', label: 'hart' },
		{ shortcut: 'p', label: 'laylist' },
	];

	const musicControlbuttons: IButtonProps[] = [
		{
			className: 'w-[75px]',
			onClick: handleBackwardClick,
			children: <i className="fa fa-step-backward"></i>,
		},
		{
			className: 'w-[80px]',
			onClick: isPlaying && !isMuted ? handlePauseClick : handlePlayClick,
			children:
				isPlaying && !isMuted ? (
					<i className="fa fa-pause"></i>
				) : (
					<i className="fa fa-play"></i>
				),
		},
		{
			className: 'w-[75px]',
			onClick: handleForwardClick,
			children: <i className="fa fa-step-forward"></i>,
		},
	];

	const userControlbuttons: IButtonProps[] = [
		{
			className: 'w-[75px]',
			children: <i className="fa fa-user"></i>,
		},
		{
			className: 'w-[75px]',
			children: <i className="fa fa-gear"></i>,
		},
	];

	useEffect(() => {
		const timer = setInterval(() => {
			if (playerRef.current && isPlaying) {
				const newCurrentTime = Math.round(playerRef.current.getCurrentTime());
				setCurrentTime(newCurrentTime);
			}
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, [isPlaying]);

	return (
		<Modal open={open} onClose={onClose} title="🎧 Music">
			{loading ? (
				<div>Loading...</div>
			) : (
				<div>
					<Navigation navItems={musicModalnavItems} />

					<InsetShadowContainer className="py-[19px] px-[21px]">
						<div className="flex space-x-[20px]">
							<div className=" flex-shrink-0 w-[218px] h-[122px] bg-black flex justify-center items-center overflow-hidden">
								<img
									className="h-full"
									src={currentSong?.thumbnail || '/no-thumbnail.png'}
									alt={currentSong?.songTitle || '재생 가능한 노래가 없습니다'}
								/>
							</div>
							<div className="w-full">
								<h3 className="text-xl font-semibold font-kor">
									{currentSong?.songTitle}
								</h3>
								<p className="text-lg font-semibold font-kor mb-[24px]">
									{currentSong?.artist}
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
									<div>{`${formatTime(currentTime)} / ${formatTime(
										duration,
									)}`}</div>
									<VolumeBar player={playerRef.current} />
								</div>
							</div>
						</div>
						<div className="flex justify-between mt-[20px]">
							<ButtonGroup buttons={userControlbuttons} />
							<div className="flex justify-between">
								<ButtonGroup buttons={musicControlbuttons} />
								<Button className="w-[80px] space-x-[1px] flex justify-center items-center ml-[15px]">
									<i className="fa fa-heart"></i>
									<span className="font-medium font-eng text-[13px]">100</span>
								</Button>
							</div>
						</div>
					</InsetShadowContainer>
					<p className="font-medium font-kor text-[13px] flex justify-end pt-[6px] pb-[5px]">
						Welcome, seoyoonyi
					</p>
				</div>
			)}
			<YouTube
				videoId={new URL(currentSong.url).searchParams.get('v') || ''}
				opts={opts}
				// style={{ display: 'none' }}
				onReady={handleReady}
				onStateChange={handleStateChange}
				onEnd={() => {
					setIsPlaying(false);
					setTimeout(() => setCurrentTime(duration), 1000);
				}}
			/>
		</Modal>
	);
};

export default MusicModal;
