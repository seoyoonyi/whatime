export const formatTime = (seconds: number): string => {
	if (seconds < 0) seconds = 0;
	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const truncateTitle = (title: string, maxLength = 20) =>
	title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;

export const getRefetchInterval = () => {
	const now = new Date();
	const KSTOffset = 9 * 60;
	const currentKST = new Date(now.getTime() + (now.getTimezoneOffset() + KSTOffset) * 60000);
	const nextMidnightKST = new Date(currentKST);
	nextMidnightKST.setDate(currentKST.getDate() + 1);
	nextMidnightKST.setHours(0, 0, 0, 0);
	return nextMidnightKST.getTime() - currentKST.getTime();
};
