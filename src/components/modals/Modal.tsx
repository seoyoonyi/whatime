import React, { MouseEvent, MouseEventHandler, RefObject, useLayoutEffect } from 'react';
import useDrag from '../../hooks/useDrag';
import Frame from '../Frame';
import ModalHeader from './ModalHeader';
import { useModalStore } from '../../stores/useModalStore';
import { ModalType } from '../../types/modalTypes';

interface IModalComponentProps {
	open: boolean;
	onOpen?: MouseEventHandler<HTMLDivElement>;
	onMinimize?: MouseEventHandler<HTMLButtonElement>;
	onClose: MouseEventHandler<HTMLButtonElement>;
	children: React.ReactNode;
	title?: string;
	className?: string;
	icon?: React.ReactElement;
	style?: React.CSSProperties;
	onMouseMove?: (e: MouseEvent<HTMLDivElement>) => void;
	onMouseUp?: () => void;
	onMouseDown?: (e: MouseEvent<HTMLDivElement>) => void;
	onMouseLeave?: () => void;
	modalRef: RefObject<HTMLDivElement>;
	modalKey: ModalType;
}

const Modal = ({
	open,
	icon,
	onOpen,
	onMinimize,
	onClose,
	children,
	title,
	className,
	style,
	modalRef,
	modalKey,
}: IModalComponentProps) => {
	const { modalsState } = useModalStore();
	const modalInfo = modalsState[modalKey];
	const zIndex = modalInfo?.zIndex;

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
			onOpen={onOpen}
			style={{
				transform: `translate3d(${modalPos.x}px, ${modalPos.y}px, 0)`,
				userSelect: 'none',
				zIndex,
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
