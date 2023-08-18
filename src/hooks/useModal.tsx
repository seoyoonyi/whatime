import { MouseEvent, useContext, useState } from 'react';
import ModalContext, { ModalKeys, ModalZIndexType } from '../contexts/ModalContext';
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
	} = useContext(ModalContext);

	const [modalState, setModalState] = useState<ModalState>(initialState);

	const bringToFront = () => {
		const newZIndex = currentHighestZIndex + 1;
		setModalState((prev) => ({ ...prev, zIndex: newZIndex }));

		if (modalType) {
			setModalZIndexes((prev) => {
				const updatedZIndexes: ModalZIndexType = { ...prev };

				for (const key of Object.keys(prev) as ModalKeys[]) {
					updatedZIndexes[key] = key === modalType ? newZIndex : updatedZIndexes[key] - 1;
				}

				return updatedZIndexes;
			});
			incrementZIndex();
			if (currentHighestModal !== modalType) setCurrentHighestModal(modalType);
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

		const sortedModals = Object.entries(modalsState).sort(
			([, zIndexA], [, zIndexB]) =>
				(zIndexB as unknown as number) - (zIndexA as unknown as number),
		);

		const nextHighestModal = sortedModals.find(([key]) => key !== modalType);

		if (nextHighestModal) {
			setCurrentHighestModal(nextHighestModal[0] as ModalType);
		}
	};

	const toggleMinimize = () => {
		setModalState((prev) => ({
			...prev,
			isMinimized: !prev.isMinimized,
		}));
		if (!modalState.isMinimized) {
			bringToFront();
		}
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
