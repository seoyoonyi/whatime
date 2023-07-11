export const formatTime = (seconds: number): string => {
	if (seconds < 0) seconds = 0;
	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const truncateTitle = (title: string, maxLength = 55) =>
	title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;
