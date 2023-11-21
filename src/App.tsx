import React from 'react';
import '@react95/icons/icons.css';
import './App.css';
import MainPage from './page/MainPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<MainPage></MainPage>
		</QueryClientProvider>
	);
}

export default App;
