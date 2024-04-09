import axios, { AxiosInstance } from 'axios';
import { ISong } from '../types/types';
import mockData from '../data/mock.json';

const apiUrl = process.env.REACT_APP_API_URL;

export default class MusicClient {
	private httpClient: AxiosInstance;

	constructor() {
		this.httpClient = axios.create({ baseURL: apiUrl });
	}

	async fetchChartSongs(): Promise<ISong[]> {
		try {
			const response = await this.httpClient.get('/chart', { timeout: 3000 });
			if (
				response.data &&
				Array.isArray(response.data.data) &&
				response.data.data.length > 0
			) {
				return response.data.data;
			} else {
				console.warn('Empty or invalid API response, returning mock data.');
				return mockData.data;
			}
		} catch (error) {
			console.error('API fetch error:', error);
			console.warn('API fetch error, returning mock data.');
			return mockData.data;
		}
	}
}
