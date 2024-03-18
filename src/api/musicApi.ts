import axios from 'axios';
import mockData from '../data/mock.json';

export const apiUrl = process.env.REACT_APP_API_URL as string;

export class Music {
	apiUrl: string;

	constructor(apiUrl: string) {
		this.apiUrl = apiUrl;
	}

	async fetchSongs() {
		if (process.env.NODE_ENV === 'development') {
			return mockData.data;
		}

		try {
			const response = await axios.get(this.apiUrl, { timeout: 3000 });
			if (
				response.data &&
				Array.isArray(response.data.data) &&
				response.data.data.length > 0
			) {
				return response.data.data;
			} else {
				console.warn(
					'No data or invalid response format from API, using mock data instead',
				);
				return mockData.data;
			}
		} catch (error) {
			console.error('Failed to fetch songs from API, using mock data instead:', error);
			return mockData.data;
		}
	}
}
