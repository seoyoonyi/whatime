import { ISong } from '../types/types';

interface IApiClient {
	fetchChartSongs(): Promise<ISong[]>;
}

export default class MusicService {
	private apiClient: IApiClient;
	private fallbackClient: IApiClient;

	constructor(apiClient: IApiClient, fallbackClient: IApiClient) {
		this.apiClient = apiClient;
		this.fallbackClient = fallbackClient;
	}

	public async fetchChartSongs(): Promise<ISong[]> {
		return this.#fetchChartSongsWithFallback();
	}

	async #fetchChartSongsWithFallback(): Promise<ISong[]> {
		try {
			return await this.apiClient.fetchChartSongs();
		} catch (error) {
			console.error('Primary API error, trying fallback.', error);
			try {
				return await this.fallbackClient.fetchChartSongs();
			} catch (fallbackError) {
				console.error('Fallback error, no more retries.', fallbackError);
				throw new Error('Songs unavailable, try again later.');
			}
		}
	}
}
