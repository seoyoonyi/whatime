import create from 'zustand';
import { ModalType } from '../types/modalTypes';

type ModalStateType = Record<ModalType, { isOpen: boolean; zIndex: number; isMinimized: boolean }>;
export type ModalZIndexType = Record<ModalType, number>;

interface IModalStore {
	modalsState: ModalStateType;
	currentHighestZIndex: number;
	currentHighestModal: ModalType | null;
	modalZIndexes: ModalZIndexType;
	openedModals: ModalType[];
	setModalsState: (newState: ModalStateType) => void;
	setCurrentHighestModal: (modal: ModalType | null) => void;
	incrementZIndex: () => void;
	setOpenedModals: (modals: ModalType[]) => void;
	setModalZIndexes: (modalType: ModalType, newZIndex: number) => void;
	bringToFront: (modalType: ModalType) => void;
	openModal: (modalType: ModalType) => void;
	closeModal: (modalType: ModalType) => void;
	toggleMinimizeModal: (modalType: ModalType) => void;
}

const createInitialModalZIndexes = (
	modalKeys: ModalType[],
	startZIndex: number,
): ModalZIndexType => {
	const zIndexes: Partial<ModalZIndexType> = {};
	modalKeys.forEach((key, index) => {
		zIndexes[key] = startZIndex - index;
	});
	return zIndexes as ModalZIndexType;
};

const createInitialModalsState = (modalKeys: ModalType[]): ModalStateType => {
	const state: Partial<ModalStateType> = {};
	for (const key of modalKeys) {
		if (key === 'music') {
			state[key] = { isOpen: true, zIndex: 5, isMinimized: false };
		} else {
			state[key] = { isOpen: false, zIndex: 0, isMinimized: false };
		}
	}
	return state as ModalStateType;
};
const ModalKeysArray: ModalType[] = ['music', 'chart', 'signIn', 'signUp'];

const initialModalZIndexes = createInitialModalZIndexes(ModalKeysArray, 5);
const initialModalsState = createInitialModalsState(ModalKeysArray);

export const useModalStore = create<IModalStore>((set, get) => ({
	modalsState: initialModalsState,
	currentHighestZIndex: 5,
	currentHighestModal: null,
	modalZIndexes: initialModalZIndexes,
	openedModals: [],
	setModalsState: (newState: ModalStateType) => set(() => ({ modalsState: newState })),
	setCurrentHighestModal: (modal: ModalType | null) =>
		set(() => ({ currentHighestModal: modal })),
	incrementZIndex: () =>
		set((state) => ({ currentHighestZIndex: state.currentHighestZIndex + 1 })),
	setOpenedModals: (modals: ModalType[]) => set(() => ({ openedModals: modals })),
	setModalZIndexes: (modalType: ModalType, newZIndex: number) => {
		set((state) => {
			const newModalsState = {
				...state.modalsState,
				[modalType]: {
					...state.modalsState[modalType],
					zIndex: newZIndex,
				},
			};
			return { modalsState: newModalsState };
		});
	},
	bringToFront: (modalType: ModalType) => {
		set((state) => {
			const newHighestZIndex = state.currentHighestZIndex + 1;
			const newModalZIndexes = {
				...state.modalZIndexes,
				[modalType]: newHighestZIndex,
			};
			const newModalsState = {
				...state.modalsState,
				[modalType]: {
					...state.modalsState[modalType],
					zIndex: newHighestZIndex,
				},
			};
			return {
				currentHighestZIndex: newHighestZIndex,
				modalZIndexes: newModalZIndexes,
				modalsState: newModalsState,
				currentHighestModal: modalType,
			};
		});
	},
	openModal: (modalType: ModalType) => {
		set((state) => {
			const newZIndex = state.currentHighestZIndex + 1;

			const updatedModalState = {
				...state.modalsState,
				[modalType]: {
					...state.modalsState[modalType],
					isOpen: true,
					isMinimized: false,
					zIndex: newZIndex,
				},
			};

			const updatedOpenedModals = state.openedModals.includes(modalType)
				? state.openedModals
				: [...state.openedModals, modalType];

			return {
				modalsState: updatedModalState,
				currentHighestZIndex: newZIndex,
				currentHighestModal: modalType,
				openedModals: updatedOpenedModals,
			};
		});
	},
	closeModal: (modalType: ModalType) =>
		set((state) => {
			const newState = {
				...state.modalsState,
				[modalType]: { ...state.modalsState[modalType], isOpen: false },
			};
			return {
				modalsState: newState,
				openedModals: state.openedModals.filter((m) => m !== modalType),
				currentHighestModal: modalType,
			};
		}),
	toggleMinimizeModal: (modalType: ModalType) => {
		set((state) => {
			const isMinimized = !state.modalsState[modalType].isMinimized;
			const updatedModalState = {
				...state.modalsState,
				[modalType]: {
					...state.modalsState[modalType],
					isMinimized,
				},
			};

			if (!isMinimized) {
				const newZIndex = state.currentHighestZIndex + 1;
				updatedModalState[modalType].zIndex = newZIndex;

				return {
					modalsState: updatedModalState,
					currentHighestZIndex: newZIndex,
					currentHighestModal: modalType,
					modalZIndexes: {
						...state.modalZIndexes,
						[modalType]: newZIndex,
					},
				};
			}

			return {
				modalsState: updatedModalState,
			};
		});
	},
}));
