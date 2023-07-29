import React from 'react';
import Modal from './Modal';
import ProgressBar from '../ProgressBar';
import VolumeBar from '../volumebar/VolumeBar';
import Button, { IButtonProps } from '../Button';
import ButtonGroup from '../ButtonGroup';
import { INavItemProps } from '../NavItem';
import Navigation from '../Navigation';
import he from 'he';
import { formatTime, truncateTitle } from '../../utils/ utils';
import { IPlayer, ISong } from '../../types/types';
import useDrag from '../../hooks/useDrag';

interface IMusicPlayerModalProps {
	open: boolean;
	onClose: () => void;
	isPlaying: boolean;
	currentSongIndex: number;
	playerRef: React.MutableRefObject<IPlayer | null>;
	songs: ISong[];
	songTransitionLoading: boolean;
	isPrevDisabled: boolean;
	isNextDisabled: boolean;
	duration: number;
	currentTime: number;
	handleTimeUpdate: (newTime: number) => void;
	handlePlayClick: () => void;
	isMuted: boolean;
	setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
	volume: number;
	setVolume: React.Dispatch<React.SetStateAction<number>>;
	handlePrevSong: () => void;
	isPlayButton: boolean;
	handlePauseClick: () => void;
	handleNextSong: () => void;
	playerLoading: boolean;
}

const MusicModal = ({
	open,
	onClose,
	isPlaying,
	currentSongIndex,
	songs,
	playerRef,
	songTransitionLoading,
	isPrevDisabled,
	isNextDisabled,
	duration,
	currentTime,
	handleTimeUpdate,
	handlePlayClick,
	isMuted,
	setIsMuted,
	volume,
	setVolume,
	handlePrevSong,
	isPlayButton,
	handlePauseClick,
	handleNextSong,
	playerLoading,
}: IMusicPlayerModalProps) => {
	const { modalPos, handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave } =
		useDrag();
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
			onClick: isPlayButton ? handlePlayClick : handlePauseClick,
			children: isPlayButton ? (
				<i className="fa fa-play"></i>
			) : (
				<i className="fa fa-pause"></i>
			),
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

	return (
		<Modal
			className="absolute z-[1]"
			open={open}
			onClose={onClose}
			title="🎧 Music"
			style={{ transform: `translate3d(${modalPos.x}px, ${modalPos.y}px, 0)` }}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseDown={handleMouseDown}
			onMouseLeave={handleMouseLeave}
		>
			<div>
				<Navigation navItems={musicModalnavItems} />

				<div className="py-[19px] px-[21px] insetShadowStyle">
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
										<VolumeBar
											player={playerRef.current}
											volume={volume}
											setVolume={setVolume}
											isMuted={isMuted}
											setIsMuted={setIsMuted}
										/>
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
				</div>
				<p className="font-medium font-kor text-[13px] flex justify-end pt-[6px] pb-[5px]">
					Hello, World
				</p>
			</div>
		</Modal>
	);
};

export default MusicModal;
