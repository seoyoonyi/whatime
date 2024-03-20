import axios from 'axios';

export default class FakeMusicClient {
	async fetchChartSongs() {
		try {
			const response = await axios.get('../data/mock.json');
			return response.data;
		} catch (error) {
			console.error('Mock data fetch error:', error);
			throw error;
		}
	}
}
