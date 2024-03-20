import MusicService from '../api/MusicService';
import MusicClient from '../api/MusicClient';
import FakeMusicClient from '../api/FakeMusicClient';

export function useMusicService() {
	const apiClient =
		process.env.NODE_ENV === 'development' ? new FakeMusicClient() : new MusicClient();
	const fallbackClient = new FakeMusicClient();

	const musicService = new MusicService(apiClient, fallbackClient);

	return musicService;
}
