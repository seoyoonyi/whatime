import { useRef, useState, useMemo, useCallback, MouseEvent, RefObject } from 'react';

const useDrag = (modalRef: RefObject<HTMLDivElement>) => {
	const dragging = useRef(false);
	const pos = useRef({ x: 0, y: 0 });
	const [modalPos, setModalPos] = useState({ x: 0, y: 0 });

	const handleMouseDown = useCallback((event: MouseEvent<HTMLDivElement>) => {
		dragging.current = true;
		pos.current = { x: event.clientX, y: event.clientY };
	}, []);

	const handleMouseMove = useCallback(
		(event: MouseEvent<HTMLDivElement>) => {
			if (dragging.current && modalRef.current) {
				const newPosX = event.clientX - pos.current.x;
				const newPosY = event.clientY - pos.current.y;
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

				pos.current = { x: event.clientX, y: event.clientY };
			}
		},
		[modalRef],
	);

	const handleMouseUp = useCallback(() => {
		dragging.current = false;
	}, []);

	const handleMouseLeave = useCallback(() => {
		dragging.current = false;
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
