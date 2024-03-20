import axios, { AxiosInstance } from 'axios';
import { ISong } from '../types/types';

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
				console.warn('Empty or invalid API response');
				return [];
			}
		} catch (error) {
			console.error('API fetch error:', error);
			throw error;
		}
	}
}
