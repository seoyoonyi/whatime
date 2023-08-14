/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';
interface IModalComponentProps {
	children: React.ReactNode;
}

interface IModalContextType {
	currentHighestZIndex: number;
	incrementZIndex: () => void;
}

const ModalContext = createContext<IModalContextType>({
	currentHighestZIndex: 5,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	incrementZIndex: () => {},
});

export const ModalProvider = ({ children }: IModalComponentProps) => {
	const [currentHighestZIndex, setCurrentHighestZIndex] = useState(5);

	const incrementZIndex = () => {
		setCurrentHighestZIndex((prev) => prev + 1);
	};

	return (
		<ModalContext.Provider value={{ currentHighestZIndex, incrementZIndex }}>
			{children}
		</ModalContext.Provider>
	);
};

export default ModalContext;
