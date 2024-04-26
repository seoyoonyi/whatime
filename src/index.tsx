import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Redirection from './page/Redirection';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/kakao/callback',
		element: <Redirection />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
