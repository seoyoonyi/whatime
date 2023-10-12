import React from 'react';
import '@react95/icons/icons.css';

import './App.css';
import MainPage from './page/MainPage';
import { ModalProvider } from './contexts/ModalContext';
import { MusicProvider } from './contexts/MusicContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<MusicProvider>
				<ModalProvider>
					<MainPage></MainPage>
				</ModalProvider>
			</MusicProvider>
		</QueryClientProvider>
	);
}

export default App;
