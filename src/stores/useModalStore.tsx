import create from 'zustand';
import { ModalType } from '../page/MainPage';

export type ModalKeys = 'music' | 'chart' | 'signUp' | 'signIn';

type ModalStateType = Record<ModalKeys, { isOpen: boolean; zIndex: number }>;
export type ModalZIndexType = Record<ModalKeys, number>;

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
	setModalZIndexes: (newZIndexes: ModalZIndexType) => void;
}

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

const ModalKeysArray: ModalKeys[] = ['music', 'chart', 'signIn', 'signUp'];

const initialModalZIndexes = createInitialModalZIndexes(ModalKeysArray, 5);
const initialModalsState = createInitialModalsState(ModalKeysArray);

export const useModalStore = create<IModalStore>((set) => ({
	modalsState: initialModalsState,
	currentHighestZIndex: 5,
	currentHighestModal: 'music',
	modalZIndexes: initialModalZIndexes,
	openedModals: ['music'],
	setModalsState: (newState) => set(() => ({ modalsState: newState })),
	setCurrentHighestModal: (modal) => set(() => ({ currentHighestModal: modal })),
	incrementZIndex: () =>
		set((state) => ({ currentHighestZIndex: state.currentHighestZIndex + 1 })),
	setOpenedModals: (modals) => set(() => ({ openedModals: modals })),
	setModalZIndexes: (newZIndexes) => set(() => ({ modalZIndexes: newZIndexes })),
}));
