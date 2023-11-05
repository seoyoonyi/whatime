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
		openedModals,
		setOpenedModals,
	} = useContext(ModalContext);

	const [modalState, setModalState] = useState<ModalState>(initialState);

	const bringToFront = () => {
		if (modalType) {
			const newZIndex = currentHighestZIndex + 1;
			setModalState((prev) => ({ ...prev, zIndex: newZIndex }));
			incrementZIndex();
			setCurrentHighestModal(modalType);
			setModalZIndexes((prevZIndexes) => ({
				...prevZIndexes,
				[modalType]: newZIndex,
			}));
		}
	};

	const open = (event: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
		event.stopPropagation();
		setModalState((prev) => ({
			...prev,
			isOpen: true,
			isMinimized: false,
		}));
		bringToFront();
		if (modalType && !openedModals.includes(modalType)) {
			setOpenedModals([...openedModals, modalType]);
		}
	};

	const close = (event: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
		event.stopPropagation();
		setModalState((prev) => ({
			...prev,
			isOpen: false,
			isMinimized: false,
		}));
		if (modalType) {
			setOpenedModals(openedModals.filter((m: ModalType) => m !== modalType));
		}
		if (modalType === currentHighestModal) {
			const sortedModals = Object.entries(modalsState).sort(
				([, zIndexA], [, zIndexB]) =>
					(zIndexB as unknown as number) - (zIndexA as unknown as number),
			);
			const nextHighestModal = sortedModals[0][0] as ModalType;
			setCurrentHighestModal(nextHighestModal);
		}
	};

	const toggleMinimize = (event: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
		event.stopPropagation();

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
