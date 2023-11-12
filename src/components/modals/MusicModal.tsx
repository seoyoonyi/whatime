import React, { MouseEventHandler, useEffect, useRef } from 'react';
import useMusicStore from '../../stores/useMusicStore';
import Modal from './Modal';
import ProgressBar from '../ProgressBar';
import VolumeBar from '../volumebar/VolumeBar';
import Button, { IButtonProps } from '../buttons/Button';
import ButtonGroup from '../buttons/ButtonGroup';
import { INavItemProps } from '../NavItem';
import Navigation from '../Navigation';
import he from 'he';
import { formatTime, truncateTitle } from '../../utils/utils';
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
	onModalClick: MouseEventHandler<HTMLDivElement>;
	onClose: MouseEventHandler<HTMLButtonElement>;
	onMinimize: MouseEventHandler<HTMLButtonElement>;
	openChartModal: MouseEventHandler<HTMLLIElement>;
	openSignInModal: MouseEventHandler<HTMLLIElement>;
	currentSongIndex: number;
	playerRef: React.MutableRefObject<IPlayer | null>;
	songs: ISong[];
	handleAddSongClick: (song: ISong) => void;
	isLoading: boolean;
}

const MusicModal = ({
	open,
	onClose,
	onMinimize,
	onModalClick,
	currentSongIndex,
	songs,
	playerRef,
	openChartModal,
	openSignInModal,
	handleAddSongClick,
	style,
	isLoading,
}: IMusicPlayerModalProps) => {
	const musicModalRef = useRef(null);

	const {
		handlePlayClick,
		handlePrevSong,
		handlePauseClick,
		handleNextSong,
		isPrevDisabled,
		isNextDisabled,
		isPlayButton,
		songTransitionLoading,
		currentTime,
		duration,
	} = useMusicStore((state) => ({
		handlePlayClick: state.handlePlayClick,
		handlePrevSong: state.handlePrevSong,
		handlePauseClick: state.handlePauseClick,
		handleNextSong: state.handleNextSong,
		isPrevDisabled: state.isPrevDisabled,
		isNextDisabled: state.isNextDisabled,
		isPlayButton: state.isPlayButton,
		songTransitionLoading: state.songTransitionLoading,
		currentTime: state.currentTime,
		duration: state.duration,
	}));

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
		{ shortcut: 'c', label: 'hart', onClick: openChartModal },
		{ shortcut: 'p', label: 'laylist' },
	];

	const musicControlbuttons: IButtonProps[] = [
		{
			className: `w-[60px] xl:w-[75px] ${
				isPrevDisabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
			}`,
			disabled: isPrevDisabled,
			onClick: handlePrevSong,
			children: <FontAwesomeIcon icon={faStepBackward} />,
		},
		{
			className: 'w-[65px] xl:w-[80px] cursor-pointer',
			onClick: isPlayButton ? handlePlayClick : handlePauseClick,
			children: isPlayButton ? (
				<FontAwesomeIcon icon={faPlay} />
			) : (
				<FontAwesomeIcon icon={faPause} />
			),
		},
		{
			className: `w-[60px] xl:w-[75px] ${
				isNextDisabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
			}`,
			disabled: isNextDisabled,
			onClick: handleNextSong,
			children: <FontAwesomeIcon icon={faStepForward} />,
		},
	];
	const userControlbuttons: IButtonProps[] = [
		{
			className: 'md:w-[65px] xl:w-[75px] w-1/2',
			onClick: openSignInModal,
			children: <FontAwesomeIcon icon={faUser} />,
		},
		{
			className: 'md:w-[65px] xl:w-[75px] w-1/2',
			children: <FontAwesomeIcon icon={faGear} />,
		},
	];

	return (
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
			<Navigation navItems={musicModalnavItems} onClick={openChartModal} />

			<Frame
				className="md:w-[520px] py-4 px-4 xl:py-[19px] xl:px-[21px] xl:w-[620px]"
				boxShadow="in"
				bg="retroGray"
			>
				{isLoading ? (
					<div className="w-full flex  items-center justify-center text-black h-[176px] md:h-auto">
						<span className="w-[30px]">
							<img className="w-full" src="/hourglass.gif" alt="Loading..." />
						</span>
						<p>Loading...</p>
					</div>
				) : (
					<>
						<div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-[20px]">
							<div className="hidden md:flex-col md:flex md:space-y-0">
								<div className="flex-shrink-0 h-[118px] w-[214px] bg-black flex justify-center items-center overflow-hidden">
									<img
										className="w-full"
										src={thumbnailImage}
										alt={songTransitionLoading ? 'loading' : currentSongTitle}
									/>
								</div>
							</div>
							<div className="w-full">
								<div className="text-xl font-extrabold font-kor">
									{currentSongTitle}
								</div>
								<div className="font-kor font-semibold mb-[24px]">
									{currentSongArtist}
								</div>
								<ProgressBar className="h-[4px] mb-[17px]" />
								<div className="flex items-center justify-between">
									<div>{`${formatTime(currentTime)} / ${formatTime(
										duration,
									)}`}</div>
									<VolumeBar />
								</div>
							</div>
						</div>
						<div className="md:flex md:justify-between">
							<div className="flex justify-between mt-[20px]  md:order-2">
								<ButtonGroup buttons={musicControlbuttons} />
								<Button
									className="w-[60px] xl:w-[80px] xl:ml-[33px] flex justify-center items-center ml-[10px]"
									onClick={() => handleAddSongClick(currentSong)}
								>
									<FontAwesomeIcon icon={faPlus} />
								</Button>
							</div>
							<ButtonGroup
								buttons={userControlbuttons}
								className="mt-[5px] md:mt-[20px] md:order-1"
							/>
						</div>
					</>
				)}
			</Frame>
			<p className="font-medium font-kor text-[13px] flex justify-end pt-[6px] pb-[5px]">
				Hello, World
			</p>
		</Modal>
	);
};

export default MusicModal;
