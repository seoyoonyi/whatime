import { MouseEvent, useContext, useState } from 'react';
import ModalContext from '../contexts/ModalContext';
import { ModalType } from '../page/MainPage';

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

const useModal = (initialState = defaultState, modalType?: ModalType) => {
	const {
		currentHighestZIndex,
		incrementZIndex,
		currentHighestModal,
		setCurrentHighestModal,
		modalsState,
	} = useContext(ModalContext);

	const [modalState, setModalState] = useState<ModalState>(initialState);

	const bringToFront = () => {
		setModalState((prev) => ({
			...prev,
			zIndex: currentHighestZIndex + 1,
		}));
		incrementZIndex();

		if (modalType && currentHighestModal !== modalType) {
			setCurrentHighestModal(modalType);
		}
	};

	const open = () => {
		setModalState((prev) => ({
			...prev,
			isOpen: true,
		}));
		bringToFront();
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

	const checkAllModalsMinimized = () => {
		const allMinimized = !Object.values(modalsState).some((modal) => !modal);
		return allMinimized;
	};

	return {
		modalState,
		open,
		close,
		toggleMinimize,
		bringToFront,
		isAllMinimized: checkAllModalsMinimized(),
	};
};

export default useModal;
