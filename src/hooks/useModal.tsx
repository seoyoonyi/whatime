import { MouseEvent, useContext, useEffect, useState } from 'react';
import ModalContext from '../contexts/ModalContext';

type ModalState = {
	isOpen: boolean;
	isMinimized: boolean;
	zIndex: number;
};

const defaultState: ModalState = {
	isOpen: false,
	isMinimized: false,
	zIndex: 5,
};

const useModal = (initialState = defaultState) => {
	const { currentHighestZIndex, incrementZIndex } = useContext(ModalContext);

	const [modalState, setModalState] = useState<ModalState>(initialState);

	const open = () => {
		setModalState((prev) => ({
			...prev,
			isOpen: true,
			zIndex: currentHighestZIndex + 1,
		}));
		incrementZIndex();
	};

	const close = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
		event.stopPropagation();
		setModalState((prev) => ({
			...prev,
			isOpen: false,
		}));
	};

	const toggleMinimize = () => {
		setModalState((prev) => ({
			...prev,
			isMinimized: !prev.isMinimized,
		}));
	};

	return {
		modalState,
		open,
		close,
		toggleMinimize,
	};
};

export default useModal;
