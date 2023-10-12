import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL as string;

export const fetchSongs = async () => {
	const response = await axios.get(apiUrl);
	if (response.data && Array.isArray(response.data.data)) {
		return response.data.data;
	} else {
		console.error('Invalid response format.');
		return [];
	}
};
