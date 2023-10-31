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
		setModalZIndexes,
		updateModalPriority,
	} = useContext(ModalContext);

	const [modalState, setModalState] = useState<ModalState>(initialState);

	const bringToFront = () => {
		if (modalType && modalState.isOpen) {
			incrementZIndex();
			setModalState((prev) => ({
				...prev,
				zIndex: currentHighestZIndex + 1,
			}));
			setCurrentHighestModal(modalType);
		}
	};

	const open = () => {
		setModalState((prev) => ({
			...prev,
			isOpen: true,
			isMinimized: false,
		}));
		if (modalType !== undefined) {
			updateModalPriority(modalType);
		}
	};

	const close = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
		event.stopPropagation();
		setModalState((prev) => ({
			...prev,
			isOpen: false,
			isMinimized: false,
		}));
		if (modalType === currentHighestModal) {
			const sortedModals = Object.entries(modalsState).sort(
				([, zIndexA], [, zIndexB]) =>
					(zIndexB as unknown as number) - (zIndexA as unknown as number),
			);
			const nextHighestModal = sortedModals[0][0] as ModalType;
			setCurrentHighestModal(nextHighestModal);
		}
	};

	const toggleMinimize = () => {
		setModalState((prev) => {
			const nextMinimizedState = !prev.isMinimized;

			if (!nextMinimizedState) {
				bringToFront();
			}

			return {
				...prev,
				isMinimized: nextMinimizedState,
			};
		});
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
