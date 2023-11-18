import React, { useEffect, useCallback, useState } from 'react';

import { useMusicStore } from '../stores/useMusicStore';
import { IPlayer } from '../types/types';

interface IProgressBarProps {
	className?: string;
	playerRef: React.MutableRefObject<IPlayer | null>;
}

const ProgressBar = ({ className, playerRef }: IProgressBarProps) => {
	const [isDragging, setDragging] = useState<boolean>(false);
	const { isPlaying, currentTime, duration, setCurrentTime } = useMusicStore((state) => ({
		isPlaying: state.isPlaying,
		currentTime: state.currentTime,
		duration: state.duration,
		setCurrentTime: state.setCurrentTime,
	}));

	const calculateProgress = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			const progressBar = e.currentTarget;
			const progressContainerWidth = progressBar.offsetWidth;
			const clickedX = Math.max(e.clientX - progressBar.getBoundingClientRect().left, 0);
			const newTime = Math.max((clickedX / progressContainerWidth) * duration, 0);
			setCurrentTime(newTime);
			if (playerRef.current) {
				playerRef.current.seekTo(newTime);
			}
		},
		[duration, setCurrentTime, playerRef],
	);
	const handleMouseDownOnCircle = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			e.stopPropagation();
			setDragging(true);
		},
		[],
	);

	const handleMouseDownOnBar = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			calculateProgress(e);
		},
		[calculateProgress],
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
			setCurrentTime(0);
		}
	}, [currentTime, duration, isPlaying, setCurrentTime]);

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
