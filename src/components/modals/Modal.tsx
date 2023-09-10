import React, { MouseEvent, MouseEventHandler, RefObject, useLayoutEffect } from 'react';
import useModal from '../../hooks/useModal';
import useDrag from '../../hooks/useDrag';
import Frame from '../Frame';
import ModalHeader from './ModalHeader';

interface IModalComponentProps {
	open: boolean;
	onModalClick: MouseEventHandler<HTMLDivElement>;
	onMinimize: MouseEventHandler<HTMLButtonElement>;
	onClose: MouseEventHandler<HTMLButtonElement>;
	children: React.ReactNode;
	title: string;
	className?: string;
	icon?: React.ReactElement;
	style?: React.CSSProperties;
	onMouseMove?: (e: MouseEvent<HTMLDivElement>) => void;
	onMouseUp?: () => void;
	onMouseDown?: (e: MouseEvent<HTMLDivElement>) => void;
	onMouseLeave?: () => void;
	modalRef: RefObject<HTMLDivElement>;
}

const Modal = ({
	open,
	icon,
	onModalClick,
	onMinimize,
	onClose,
	children,
	title,
	className,
	style,
	modalRef,
}: IModalComponentProps) => {
	const { modalState } = useModal();

	const { modalPos, handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave } =
		useDrag(modalRef);

	useLayoutEffect(() => {
		if (modalRef && 'current' in modalRef && modalRef.current) {
			modalRef.current.style.transform = `translate(${modalPos.x}px, ${modalPos.y}px)`;
		}
	}, [modalPos, modalRef]);

	if (!open) return null;

	return (
		<Frame
			ref={modalRef}
			boxShadow="out"
			bg="retroGray"
			className={`p-[3px] ${className}`}
			onModalClick={onModalClick}
			style={{
				transform: `translate3d(${modalPos.x}px, ${modalPos.y}px, 0)`,
				userSelect: 'none',
				zIndex: modalState.zIndex,
				...style,
			}}
		>
			<ModalHeader
				icon={icon}
				title={title}
				onMinimize={onMinimize}
				onClose={onClose}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseDown={handleMouseDown}
				onMouseLeave={handleMouseLeave}
			/>
			{children}
		</Frame>
	);
};

export default Modal;
