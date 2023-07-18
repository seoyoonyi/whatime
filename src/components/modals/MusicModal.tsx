import React, { useCallback, useEffect, useRef, useState } from 'react';
import newJeans from '../../data/newjeans.json';
import YouTube, { YouTubeProps } from 'react-youtube';
import Modal from './Modal';
import ProgressBar from '../ProgressBar';
import InsetShadowContainer from '../InsetShadowContainer';
import VolumeBar from '../volumebar/VolumeBar';
import Button, { IButtonProps } from '../Button';
import ButtonGroup from '../ButtonGroup';
import { INavItemProps } from '../NavItem';
import Navigation from '../Navigation';
import he from 'he';
import { formatTime, truncateTitle } from '../../utils/ utils';
import { IPlayer, ISong } from '../types/types';

interface IMusicPlayerModalProps {
	open: boolean;
	onClose: () => void;
}

const songs: ISong[] = newJeans;

const MusicModal = ({ open, onClose }: IMusicPlayerModalProps) => {
	const playerRef = useRef<IPlayer | null>(null);
	const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [isMuted, setIsMuted] = useState<boolean>(true);
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [duration, setDuration] = useState<number>(0);
	const [playerReady, setPlayerReady] = useState<boolean>(false);
	const [playerLoading, setPlayerLoading] = useState<boolean>(true);
	const [isPrevDisabled, setIsPrevDisabled] = useState<boolean>(false);
	const [isNextDisabled, setIsNextDisabled] = useState<boolean>(false);
	const [isSongLoaded, setIsSongLoaded] = useState<boolean>(false);

	const [songTransitionLoading, setSongTransitionLoading] = useState(false);
	const opts: YouTubeProps['opts'] = {
		playerVars: {
			autoplay: 1,
			mute: 1,
		},
	};

	const currentSong = songs[currentSongIndex];

	const currentSongTitle = truncateTitle(he.decode(currentSong.title));

	const loadingMessage = (
		<h3>
			Loading...
			<br />
			Please wait...
		</h3>
	);

	const title = songTransitionLoading ? loadingMessage : <h3>{currentSongTitle}</h3>;

	const thumbnailImage = songTransitionLoading ? '/no-thumbnail.png' : currentSong?.thumbnail;

	if (!currentSong) {
		return <div>No song selected</div>;
	}

	const handleReady: YouTubeProps['onReady'] = (event) => {
		playerRef.current = event.target;
		setPlayerReady(true);
		setPlayerLoading(false);
		setSongTransitionLoading(false);
		setCurrentTime(0);

		if (isMuted) {
			event.target.mute();
		} else {
			event.target.unMute();
		}

		if (event.target.getPlayerState() === YouTube.PlayerState.PLAYING) {
			setDuration(event.target.getDuration());
		}

		setIsSongLoaded(true);
	};

	const handleStateChange: YouTubeProps['onStateChange'] = (event) => {
		if (event.data === 1) {
			setPlayerLoading(false);
			setSongTransitionLoading(false);
			setDuration(event.target.getDuration());
			setIsSongLoaded(true);
		}
	};

	const handleEnd = () => {
		setSongTransitionLoading(true);
		setIsPlaying(false);
		setCurrentTime(0);
		setTimeout(() => {
			handleNextSong();
			setIsPlaying(true);
			setSongTransitionLoading(false);
		}, 200);
	};

	const updateCurrentTime = useCallback(() => {
		if (playerRef.current && isPlaying) {
			const newCurrentTime = Math.round(playerRef.current.getCurrentTime());
			setCurrentTime(newCurrentTime);
		}
	}, [isPlaying]);

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

			playerRef.current.mute();
			setIsMuted(true);
		}
	};

	const handlePrevSong = async () => {
		if (!isSongLoaded || isPrevDisabled) return;
		setIsSongLoaded(false);
		setSongTransitionLoading(true);
		if (currentSongIndex === 0) {
			setCurrentSongIndex(songs.length - 1);
		} else {
			setCurrentSongIndex(currentSongIndex - 1);
		}
		setIsPlaying(true);
	};

	const handleNextSong = () => {
		if (!isSongLoaded || isNextDisabled) return;
		setIsSongLoaded(false);
		setSongTransitionLoading(true);
		if (currentSongIndex === songs.length - 1) {
			setCurrentSongIndex(0);
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

	const musicModalnavItems: INavItemProps[] = [
		{ shortcut: 'c', label: 'hart' },
		{ shortcut: 'p', label: 'laylist' },
	];

	const musicControlbuttons: IButtonProps[] = [
		{
			className: `w-[75px] ${
				isPrevDisabled
					? 'cursor-not-allowed opacity-40'
					: 'hover:opacity-40 hover:ease-in transition duration-150 ease-out cursor-pointer'
			}`,

			disabled: isPrevDisabled,
			onClick: handlePrevSong,
			children: <i className="fa fa-step-backward"></i>,
		},
		{
			className: 'w-[80px] hover:opacity-40 cursor-pointer',
			onClick: isMuted ? handlePlayClick : handlePauseClick,
			children: isMuted ? <i className="fa fa-play"></i> : <i className="fa fa-pause"></i>,
		},
		{
			className: `w-[75px] ${
				isNextDisabled
					? 'cursor-not-allowed opacity-40'
					: 'hover:opacity-40 hover:ease-in transition duration-150 ease-out cursor-pointer'
			}`,
			disabled: isNextDisabled,
			onClick: handleNextSong,
			children: <i className="fa fa-step-forward"></i>,
		},
	];

	const userControlbuttons: IButtonProps[] = [
		{
			className: 'w-[75px] hover:opacity-40',
			children: <i className="fa fa-user"></i>,
		},
		{
			className: 'w-[75px] hover:opacity-40',
			children: <i className="fa fa-gear"></i>,
		},
	];

	useEffect(() => {
		const timer = setInterval(updateCurrentTime, 1000);
		return () => {
			clearInterval(timer);
		};
	}, [updateCurrentTime]);

	useEffect(() => {
		setIsPrevDisabled(false);
		setIsNextDisabled(false);
	}, [currentSongIndex]);

	return (
		<Modal open={open} onClose={onClose} title="🎧 Music">
			<div>
				<Navigation navItems={musicModalnavItems} />

				<InsetShadowContainer className="py-[19px] px-[21px]">
					{playerLoading ? (
						<div className="w-full flex  items-center justify-center text-black h-[176px]">
							<span className="w-[30px]">
								<img className="w-full" src="/hourglass.gif" alt="Loading..." />
							</span>
							<p>Loading...</p>
						</div>
					) : (
						<>
							<div className="flex space-x-[20px]">
								<div className=" flex-shrink-0 w-[218px] h-[122px] bg-black flex justify-center items-center overflow-hidden">
									<img
										className="w-full"
										src={thumbnailImage}
										alt={songTransitionLoading ? 'loading' : currentSongTitle}
									/>
								</div>
								<div className="w-full">
									<div className="text-xl font-semibold font-kor mb-[24px]">
										{title}
									</div>
									<ProgressBar
										duration={duration}
										initialCurrentTime={currentTime}
										onTimeUpdate={handleTimeUpdate}
										onPlayClick={handlePlayClick}
										isPlaying={isPlaying}
										isMuted={isMuted}
										setIsMuted={setIsMuted}
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
									<Button className="w-[80px] space-x-[1px] flex justify-center items-center ml-[15px] hover:opacity-40">
										<i className="fa fa-heart"></i>
										<span className="font-medium font-eng text-[13px]">0</span>
									</Button>
								</div>
							</div>
						</>
					)}
				</InsetShadowContainer>
				<p className="font-medium font-kor text-[13px] flex justify-end pt-[6px] pb-[5px]">
					Hello, World
				</p>
			</div>

			<YouTube
				videoId={new URL(currentSong.audioUrl).searchParams.get('v') || ''}
				opts={opts}
				// style={{ display: 'none' }}
				onReady={handleReady}
				onStateChange={handleStateChange}
				onEnd={handleEnd}
			/>
		</Modal>
	);
};

export default MusicModal;
