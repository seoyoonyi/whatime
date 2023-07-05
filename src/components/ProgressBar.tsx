import React, { useRef, useEffect, useCallback, useState } from 'react';

interface IProgressBarProps {
	duration: number;
	initialCurrentTime: number;
	onTimeUpdate: (newTime: number) => void;
	className?: string;
}

const ProgressBar = ({
	duration,
	initialCurrentTime = duration / 2,
	onTimeUpdate,
	className,
}: IProgressBarProps) => {
	const [progressBar, setProgressBar] = useState<HTMLDivElement | null>(null);
	const currentTimeRef = useRef(initialCurrentTime);
	const [isDragging, setDragging] = useState<boolean>(false);

	const refCallback = useCallback((node: HTMLDivElement | null) => {
		if (node !== null) {
			setProgressBar(node);
		}
	}, []);

	const calculateProgress = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			if (progressBar) {
				const progressContainerWidth = progressBar.offsetWidth;
				const clickedX = e.clientX - progressBar.getBoundingClientRect().left;
				const newTime = (clickedX / progressContainerWidth) * duration;
				currentTimeRef.current = newTime;
				onTimeUpdate(newTime);
			}
		},
		[duration, onTimeUpdate, progressBar],
	);

	const handleMouseEvent = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			switch (e.type) {
				case 'mousedown':
					setDragging(true);
					calculateProgress(e);
					break;
				case 'mouseup':
				case 'mouseleave':
					setDragging(false);
					break;
				case 'mousemove':
					if (isDragging) {
						requestAnimationFrame(() => {
							calculateProgress(e);
						});
					}
					break;
				default:
					break;
			}
		},
		[isDragging, calculateProgress],
	);

	useEffect(() => {
		currentTimeRef.current = initialCurrentTime;
	}, [initialCurrentTime]);
	return (
		<div
			className={`relative w-full cursor-pointer border bg-retroGray border-t-black border-l-black border-b-white border-r-white ${className} ${
				isDragging ? 'cursor-grabbing' : 'cursor-grab'
			}`}
			onMouseDown={handleMouseEvent}
			onMouseUp={handleMouseEvent}
			onMouseLeave={handleMouseEvent}
			onMouseMove={handleMouseEvent}
		>
			<div
				ref={refCallback}
				className="relative w-full h-full duration-100 scale-0 bg-black"
				style={{
					transformOrigin: 'left',
					transform: `scaleX(${currentTimeRef.current / duration})`,
				}}
			/>

			<div
				className="absolute top-1/2 -left-1.5 -translate-y-1/2 h-[12px] w-[12px] bg-black rounded-full"
				style={{
					left: `calc(${Math.min(
						(currentTimeRef.current / duration) * 100,
						100,
					)}% - 6px)`,
				}}
				onMouseDown={handleMouseEvent}
				onMouseUp={handleMouseEvent}
			/>
		</div>
	);
};

export default ProgressBar;
