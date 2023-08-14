import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';

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
