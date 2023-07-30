import React, { MouseEvent, forwardRef, useLayoutEffect } from 'react';
import ModalHeader from './ModalHeader';
import useDrag from '../../hooks/useDrag';

interface IModalComponentProps {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
	title: string;
	className?: string;
	style?: React.CSSProperties;
	onMouseMove?: (e: MouseEvent<HTMLDivElement>) => void;
	onMouseUp?: () => void;
	onMouseDown?: (e: MouseEvent<HTMLDivElement>) => void;
	onMouseLeave?: () => void;
}

const Modal = forwardRef<HTMLDivElement, IModalComponentProps>(
	({ open, onClose, children, title, className }, forwardedRef) => {
		const ref = forwardedRef as React.RefObject<HTMLDivElement>;
		const { modalPos, handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave } =
			useDrag(ref);

		useLayoutEffect(() => {
			if (ref && 'current' in ref && ref.current) {
				ref.current.style.transform = `translate(${modalPos.x}px, ${modalPos.y}px)`;
			}
		}, [modalPos, ref]);

		if (!open) return null;

		return (
			<div
				ref={ref}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				className={`outsetShadowStyle p-[3px] laptop:w-[610px] ${className}`}
				style={{ transform: `translate3d(${modalPos.x}px, ${modalPos.y}px, 0)` }}
			>
				<ModalHeader
					title={title}
					onClose={onClose}
					onMouseDown={handleMouseDown}
					onMouseLeave={handleMouseLeave}
				/>
				{children}
			</div>
		);
	},
);

Modal.displayName = 'Modal';

export default Modal;
