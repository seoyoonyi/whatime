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
	setCurrentHighestZIndex: React.Dispatch<React.SetStateAction<number>>;
	modalsState: T;
	setModalsState: React.Dispatch<React.SetStateAction<T>>;
	modalZIndexes: ModalZIndexType;
	setModalZIndexes: React.Dispatch<React.SetStateAction<ModalZIndexType>>;
	secondHighestModal: ModalType | null;
}

export type ModalKeys = 'music' | 'chart';
type ModalStateType = Record<ModalKeys, { isOpen: boolean; zIndex: number }>;
export type ModalZIndexType = Record<ModalKeys, number>;

const createInitialModalZIndexes = (
	modalKeys: ModalKeys[],
	startZIndex: number,
): ModalZIndexType => {
	const zIndexes: Partial<ModalZIndexType> = {};

	modalKeys.forEach((key, index) => {
		zIndexes[key] = startZIndex - index;
	});

	return zIndexes as ModalZIndexType;
};

const createInitialModalsState = (modalKeys: ModalKeys[]): ModalStateType => {
	const state: Partial<ModalStateType> = {};

	for (const key of modalKeys) {
		state[key] = { isOpen: false, zIndex: 0 };
	}

	return state as ModalStateType;
};

export const ModalKeysArray: ModalKeys[] = ['music', 'chart'];

const initialModalZIndexes = createInitialModalZIndexes(ModalKeysArray, 5);
const initialModalsState = createInitialModalsState(ModalKeysArray);

const defaultContext: IModalContextType<ModalStateType> = {
	currentHighestZIndex: 5,
	currentHighestModal: 'music',
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setCurrentHighestModal: () => {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setCurrentHighestZIndex: () => {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	incrementZIndex: () => {},
	modalsState: initialModalsState,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setModalsState: () => {},
	modalZIndexes: initialModalZIndexes,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setModalZIndexes: () => {},
	secondHighestModal: null,
};

const ModalContext = createContext<IModalContextType<ModalStateType>>(defaultContext);

export const ModalProvider = ({ children }: IModalComponentProps) => {
	const [modalsState, setModalsState] = useState(initialModalsState);
	const [currentHighestZIndex, setCurrentHighestZIndex] = useState(5);
	const [currentHighestModal, setCurrentHighestModal] = useState<null | ModalType>('music');
	const [modalZIndexes, setModalZIndexes] = useState(initialModalZIndexes);

	const incrementZIndex = () => {
		setCurrentHighestZIndex((prev) => prev + 1);
	};

	const getSecondHighestModal = (
		modalZIndexes: ModalZIndexType,
		highestModal: ModalType | null,
	): ModalType | null => {
		const sortedModals = Object.entries(modalZIndexes).sort(
			([, zIndexA], [, zIndexB]) => zIndexB - zIndexA,
		);

		const secondHighest = sortedModals.find(([key]) => key !== highestModal);

		if (secondHighest) {
			return secondHighest[0] as ModalType;
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
				setCurrentHighestZIndex,
				modalsState,
				setModalsState,
				modalZIndexes,
				setModalZIndexes,
				secondHighestModal: getSecondHighestModal(modalZIndexes, currentHighestModal),
			}}
		>
			{children}
		</ModalContext.Provider>
	);
};

export default ModalContext;
