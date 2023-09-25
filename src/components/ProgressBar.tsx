import React, { useEffect, useCallback, useState, useContext } from 'react';
import MusicContext, { IMusicContext } from '../contexts/MusicContext';

interface IProgressBarProps {
	className?: string;
}

const ProgressBar = ({ className }: IProgressBarProps) => {
	const [isDragging, setDragging] = useState<boolean>(false);
	const { state, handleTimeUpdate } = useContext<IMusicContext>(MusicContext);

	const { isPlaying, duration, currentTime: initialCurrentTime = duration / 2 } = state;
	const [currentTime, setCurrentTime] = useState<number>(initialCurrentTime);

	const calculateProgress = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			const progressBar = e.currentTarget;
			const progressContainerWidth = progressBar.offsetWidth;
			const clickedX = Math.max(e.clientX - progressBar.getBoundingClientRect().left, 0);
			const newTime = Math.max((clickedX / progressContainerWidth) * duration, 0);
			setCurrentTime(newTime);
			handleTimeUpdate(newTime);
		},
		[duration, handleTimeUpdate],
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
			const initialTimeForNextTrack = 0;
			setCurrentTime(initialTimeForNextTrack);
			handleTimeUpdate(initialTimeForNextTrack);
		}
	}, [currentTime, duration, isPlaying, handleTimeUpdate]);

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
