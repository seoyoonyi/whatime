import React, { createContext, useState } from 'react';
import { ModalType } from '../page/MainPage';

interface IModalComponentProps {
	children: React.ReactNode;
}

interface IModalContextType<T> {
	currentHighestZIndex: number;
	incrementZIndex: () => void;
	currentHighestModal: null | ModalType;
	setCurrentHighestModal: React.Dispatch<React.SetStateAction<null | ModalType>>;
	modalsState: T;
	setModalsState: React.Dispatch<React.SetStateAction<T>>;
	modalZIndexes: ModalZIndexType;
	setModalZIndexes: React.Dispatch<React.SetStateAction<ModalZIndexType>>;
	secondHighestModal: ModalType | null; // 이 줄을 추가합니다.
}

type ModalKeys = 'music' | 'chart';
type ModalStateType = Record<ModalKeys, boolean>;
type ModalZIndexType = Record<ModalKeys, number>;

const initialModalZIndexes: ModalZIndexType = {
	music: 5,
	chart: 4, // 예를 들어
};

const createInitialModalsState = (modalKeys: ModalKeys[]): ModalStateType => {
	const state: Partial<ModalStateType> = {};

	for (const key of modalKeys) {
		state[key] = false;
	}

	return state as ModalStateType;
};

const initialModalsState = createInitialModalsState(['music', 'chart']);

const ModalContext = createContext<IModalContextType<ModalStateType>>({
	currentHighestZIndex: 5,
	currentHighestModal: 'music',
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setCurrentHighestModal: () => {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	incrementZIndex: () => {},
	modalsState: initialModalsState,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setModalsState: () => {},
	modalZIndexes: initialModalZIndexes,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setModalZIndexes: () => {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	secondHighestModal: null,
});

export const ModalProvider = ({ children }: IModalComponentProps) => {
	const [modalsState, setModalsState] = useState(initialModalsState);
	const [currentHighestZIndex, setCurrentHighestZIndex] = useState(5);
	const [currentHighestModal, setCurrentHighestModal] = useState<null | ModalType>('music');
	const [modalZIndexes, setModalZIndexes] = useState(initialModalZIndexes);

	const incrementZIndex = () => {
		setCurrentHighestZIndex((prev) => prev + 1);
	};

	const getSecondHighestModal = (modalZIndexes: ModalZIndexType): ModalType | null => {
		const sortedModals = Object.entries(modalZIndexes).sort(
			([, zIndexA], [, zIndexB]) => zIndexB - zIndexA,
		);

		if (sortedModals[1]) {
			return sortedModals[1][0] as ModalType;
		}
		return null;
	};
	return (
		<ModalContext.Provider
			value={{
				currentHighestZIndex,
				incrementZIndex,
				currentHighestModal,
				setCurrentHighestModal,
				modalsState,
				setModalsState,
				modalZIndexes,
				setModalZIndexes,
				secondHighestModal: getSecondHighestModal(modalZIndexes),
			}}
		>
			{children}
		</ModalContext.Provider>
	);
};

export default ModalContext;
