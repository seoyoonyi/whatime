import { useState, useMemo, useCallback, MouseEvent, RefObject } from 'react';

const useDrag = (modalRef: RefObject<HTMLDivElement>) => {
	const [dragging, setDragging] = useState(false);
	const [pos, setPos] = useState({ x: 0, y: 0 });
	const [modalPos, setModalPos] = useState({ x: 0, y: 0 });

	const handleMouseDown = useCallback((event: MouseEvent<HTMLDivElement>) => {
		setDragging(true);
		setPos({ x: event.clientX, y: event.clientY });
	}, []);

	const handleMouseMove = useCallback(
		(event: MouseEvent<HTMLDivElement>) => {
			if (dragging && modalRef.current) {
				const newPosX = event.clientX - pos.x;
				const newPosY = event.clientY - pos.y;
				const rect = modalRef.current.getBoundingClientRect();

				let adjustedX = newPosX;
				let adjustedY = newPosY;

				if (rect.left + newPosX < 0) adjustedX = -rect.left;
				if (rect.right + newPosX > window.innerWidth)
					adjustedX = window.innerWidth - rect.right;
				if (rect.top + newPosY < 0) adjustedY = -rect.top;
				if (rect.bottom + newPosY > window.innerHeight)
					adjustedY = window.innerHeight - rect.bottom;

				setModalPos((prev) => {
					if (prev.x === adjustedX && prev.y === adjustedY) {
						return prev;
					}
					return { x: prev.x + adjustedX, y: prev.y + adjustedY };
				});

				setPos({ x: event.clientX, y: event.clientY });
			}
		},
		[dragging, modalRef, pos.x, pos.y],
	);

	const handleMouseUp = useCallback(() => {
		setDragging(false);
	}, []);

	const handleMouseLeave = useCallback(() => {
		setDragging(false);
	}, []);

	return useMemo(
		() => ({
			modalPos,
			handleMouseDown,
			handleMouseMove,
			handleMouseUp,
			handleMouseLeave,
		}),
		[modalPos, handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave],
	);
};

export default useDrag;
