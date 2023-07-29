import { useState, useCallback, MouseEvent } from 'react';

const useDrag = () => {
	const [dragging, setDragging] = useState(false);
	const [pos, setPos] = useState({ x: 0, y: 0 });
	const [modalPos, setModalPos] = useState({ x: 0, y: 0 });

	const handleMouseDown = useCallback((event: MouseEvent<HTMLDivElement>) => {
		setDragging(true);
		setPos({ x: event.clientX, y: event.clientY });
	}, []);

	const handleMouseMove = useCallback(
		(event: MouseEvent<HTMLDivElement>) => {
			if (dragging) {
				const newPosX = event.clientX - pos.x;
				const newPosY = event.clientY - pos.y;
				setPos({ x: event.clientX, y: event.clientY });
				setModalPos((prev) => ({ x: prev.x + newPosX, y: prev.y + newPosY }));
			}
		},
		[dragging, pos],
	);

	const handleMouseUp = useCallback(() => {
		setDragging(false);
	}, []);

	const handleMouseLeave = useCallback(() => {
		setDragging(false);
	}, []);

	return {
		modalPos,
		handleMouseDown,
		handleMouseMove,
		handleMouseUp,
		handleMouseLeave,
	};
};

export default useDrag;
