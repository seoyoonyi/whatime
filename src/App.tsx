import React from 'react';
import '@react95/icons/icons.css';

import './App.css';
import MainPage from './page/MainPage';
import { ModalProvider } from './contexts/ModalContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ModalProvider>
				<MainPage></MainPage>
			</ModalProvider>
		</QueryClientProvider>
	);
}

export default App;
