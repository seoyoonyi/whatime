import axios from 'axios';
import mockData from '../data/mock.json';

const apiUrl = process.env.REACT_APP_API_URL as string;

export const fetchSongs = async () => {
	if (process.env.NODE_ENV === 'development') {
		return mockData.data;
	}
	const response = await axios.get(apiUrl);
	if (response.data && Array.isArray(response.data.data)) {
		return response.data.data;
	}
	throw new Error('Invalid response format.');
};
