import React from 'react';
import '@react95/icons/icons.css';

import './App.css';
import MainPage from './page/MainPage';
import { ModalProvider } from './contexts/ModalContext';
import { MusicProvider } from './contexts/MusicContext';

function App() {
	return (
		<MusicProvider>
			<ModalProvider>
				<MainPage></MainPage>
			</ModalProvider>
		</MusicProvider>
	);
}

export default App;
