import React, { useEffect, useCallback, useState } from 'react';

interface IProgressBarProps {
	duration: number;
	initialCurrentTime: number;
	onTimeUpdate: (newTime: number) => void;
	className?: string;
	onPlayClick: () => void;
	isPlaying: boolean;
	isMuted: boolean;
	setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProgressBar = ({
	duration,
	initialCurrentTime = duration / 2,
	onTimeUpdate,
	onPlayClick,
	isPlaying,
	className,
	isMuted,
	setIsMuted,
}: IProgressBarProps) => {
	const [currentTime, setCurrentTime] = useState<number>(initialCurrentTime);
	const [isDragging, setDragging] = useState<boolean>(false);

	const calculateProgress = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			const progressBar = e.currentTarget;
			const progressContainerWidth = progressBar.offsetWidth;
			const clickedX = Math.max(e.clientX - progressBar.getBoundingClientRect().left, 0);
			const newTime = Math.max((clickedX / progressContainerWidth) * duration, 0);
			setCurrentTime(newTime);
			onTimeUpdate(newTime);
		},
		[duration, onTimeUpdate],
	);

	const handleMouseDownOnCircle = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			e.stopPropagation();
			setDragging(true);

			if (isMuted) {
				setIsMuted(false);
				onPlayClick();
			}
		},
		[isMuted, onPlayClick, setIsMuted],
	);

	const handleMouseDownOnBar = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			calculateProgress(e);
			if (isMuted) {
				setIsMuted(false);
				onPlayClick();
			}
		},
		[calculateProgress, isMuted, onPlayClick, setIsMuted],
	);

	const handleMouseUpOrLeave = useCallback(() => {
		setDragging(false);
	}, []);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			if (isDragging) {
				calculateProgress(e);
			}
		},
		[calculateProgress, isDragging],
	);

	useEffect(() => {
		if (isPlaying && currentTime >= duration) {
			const initialTimeForNextTrack = 0;
			setCurrentTime(initialTimeForNextTrack);
			onTimeUpdate(initialTimeForNextTrack);
		}
	}, [currentTime, duration, isPlaying, onTimeUpdate]);

	useEffect(() => {
		setCurrentTime(initialCurrentTime);
	}, [initialCurrentTime]);

	return (
		<div
			className={`relative w-full cursor-pointer border bg-retroGray border-t-black border-l-black border-b-white border-r-white ${className}`}
			onMouseDown={handleMouseDownOnBar}
			onMouseUp={handleMouseUpOrLeave}
			onMouseLeave={handleMouseUpOrLeave}
			onMouseMove={handleMouseMove}
		>
			<div
				className="relative h-full duration-100 scale-0 bg-black"
				style={{
					transformOrigin: 'left',
					transform: `scaleX(${currentTime / duration})`,
				}}
			/>

			<div
				className={`absolute top-1/2 -left-1.5 -translate-y-1/2 h-[12px] w-[12px] bg-black rounded-full ${
					isDragging ? 'cursor-grabbing' : 'cursor-grab'
				}`}
				style={{
					left: `calc(${Math.min((currentTime / duration) * 100, 100)}% - 6px)`,
				}}
				onMouseDown={handleMouseDownOnCircle}
				onMouseUp={handleMouseUpOrLeave}
			/>
		</div>
	);
};

export default ProgressBar;
