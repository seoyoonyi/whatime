import mockData from '../data/mock.json';
import { ISong } from '../types/types';

export default class FakeMusicClient {
	async fetchChartSongs(): Promise<ISong[]> {
		try {
			return Promise.resolve(mockData.data);
		} catch (error) {
			console.error('Mock data fetch error:', error);
			throw error;
		}
	}
}
