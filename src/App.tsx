import React from 'react';
import '@react95/icons/icons.css';

import './App.css';
import MainPage from './page/MainPage';
import { ModalProvider } from './contexts/ModalContext';

function App() {
	return (
		<ModalProvider>
			<MainPage></MainPage>
		</ModalProvider>
	);
}

export default App;
