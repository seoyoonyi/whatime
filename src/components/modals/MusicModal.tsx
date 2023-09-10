import React, { MouseEventHandler, useEffect, useRef } from 'react';
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
import { CdMusic } from '@react95/icons';
import Frame from '../Frame';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faGear,
	faPause,
	faPlay,
	faPlus,
	faStepBackward,
	faStepForward,
	faUser,
} from '@fortawesome/free-solid-svg-icons';

interface IMusicPlayerModalProps {
	open: boolean;
	style: React.CSSProperties;
	onClose: MouseEventHandler<HTMLButtonElement>;
	onMinimize: MouseEventHandler<HTMLButtonElement>;
	onModalClick: MouseEventHandler<HTMLDivElement>;
	handleChartModalOpen: MouseEventHandler<HTMLLIElement>;
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
	onMinimize,
	onModalClick,
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
	handleChartModalOpen,
	style,
}: IMusicPlayerModalProps) => {
	const musicModalRef = useRef(null);

	const currentSong = songs[currentSongIndex];
	const currentSongTitle = songTransitionLoading
		? 'Loading...'
		: truncateTitle(he.decode(currentSong.musicTitle));

	const currentSongArtist = songTransitionLoading ? 'Please wait...' : currentSong.artist;
	const thumbnailImage = songTransitionLoading ? '/no-thumbnail.png' : currentSong?.thumbnail;

	useEffect(() => {
		if (playerRef.current && songs[currentSongIndex]) {
			playerRef.current.src = songs[currentSongIndex].url;
			if (typeof playerRef.current.play === 'function') {
				playerRef.current.play();
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentSongIndex]);

	const musicModalnavItems: INavItemProps[] = [
		{ shortcut: 'c', label: 'hart', onClick: handleChartModalOpen },
		{ shortcut: 'p', label: 'laylist' },
	];

	const musicControlbuttons: IButtonProps[] = [
		{
			className: `w-[75px] ${
				isPrevDisabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
			}`,

			disabled: isPrevDisabled,
			onClick: handlePrevSong,
			children: <FontAwesomeIcon icon={faStepBackward} />,
		},
		{
			className: 'w-[80px] cursor-pointer',
			onClick: isPlayButton ? handlePlayClick : handlePauseClick,
			children: isPlayButton ? (
				<FontAwesomeIcon icon={faPlay} />
			) : (
				<FontAwesomeIcon icon={faPause} />
			),
		},
		{
			className: `w-[75px] ${
				isNextDisabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
			}`,
			disabled: isNextDisabled,
			onClick: handleNextSong,
			children: <FontAwesomeIcon icon={faStepForward} />,
		},
	];

	const userControlbuttons: IButtonProps[] = [
		{
			className: 'w-[75px]',
			children: <FontAwesomeIcon icon={faUser} />,
		},
		{
			className: 'w-[75px]',
			children: <FontAwesomeIcon icon={faGear} />,
		},
	];

	return (
		<>
			<Modal
				className="absolute"
				open={open}
				onClose={onClose}
				onMinimize={onMinimize}
				onModalClick={onModalClick}
				icon={<CdMusic className="w-auto" />}
				title="Music"
				modalRef={musicModalRef}
				style={style}
			>
				<Navigation navItems={musicModalnavItems} onClick={handleChartModalOpen} />

				<Frame className="py-[19px] px-[21px] w-[620px]" boxShadow="in" bg="retroGray">
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
								<div>
									<div className=" flex-shrink-0 w-[218px] h-[122px] bg-black flex justify-center items-center overflow-hidden">
										<img
											className="w-full"
											src={thumbnailImage}
											alt={
												songTransitionLoading ? 'loading' : currentSongTitle
											}
										/>
									</div>

									<ButtonGroup
										buttons={userControlbuttons}
										className="mt-[20px]"
									/>
								</div>
								<div className="w-full">
									<div className="text-xl font-extrabold font-kor">
										{currentSongTitle}
									</div>
									<div className="font-kor font-semibold mb-[24px]">
										{currentSongArtist}
									</div>
									<ProgressBar
										duration={duration}
										initialCurrentTime={currentTime}
										onTimeUpdate={handleTimeUpdate}
										onPlayClick={handlePlayClick}
										isPlaying={isPlaying}
										isMuted={isMuted}
										setIsMuted={setIsMuted}
										className="h-[4px] mb-[17px]"
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
									<div className="flex justify-between mt-[20px]">
										<ButtonGroup buttons={musicControlbuttons} />
										<Button className="w-[80px] space-x-[1px] flex justify-center items-center ml-[15px]">
											<FontAwesomeIcon icon={faPlus} />
										</Button>
									</div>
								</div>
							</div>
						</>
					)}
				</Frame>
				<p className="font-medium font-kor text-[13px] flex justify-end pt-[6px] pb-[5px]">
					Hello, World
				</p>
			</Modal>
		</>
	);
};

export default MusicModal;
