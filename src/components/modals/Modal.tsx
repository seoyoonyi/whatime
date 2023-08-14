import React, { MouseEvent, MouseEventHandler, forwardRef, useLayoutEffect } from 'react';
import ModalHeader from './ModalHeader';
import useDrag from '../../hooks/useDrag';
import useModal from '../../hooks/useModal';

interface IModalComponentProps {
	open: boolean;
	onModalClick: MouseEventHandler<HTMLDivElement>;
	onMinimize: MouseEventHandler<HTMLButtonElement>;
	onClose: MouseEventHandler<HTMLButtonElement>;
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
	(
		{ open, onModalClick, onMinimize, onClose, children, title, className, style },
		forwardedRef,
	) => {
		const ref = forwardedRef as React.RefObject<HTMLDivElement>;
		const { modalState } = useModal();

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
				className={`outsetShadowStyle p-[3px] laptop:w-[610px] ${className}`}
				onClick={onModalClick}
				style={{
					transform: `translate3d(${modalPos.x}px, ${modalPos.y}px, 0)`,
					userSelect: 'none',
					zIndex: modalState.zIndex,
					...style,
				}}
			>
				<ModalHeader
					title={title}
					onMinimize={onMinimize}
					onClose={onClose}
					onMouseMove={handleMouseMove}
					onMouseUp={handleMouseUp}
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
