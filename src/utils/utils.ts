export const formatTime = (seconds: number): string => {
	if (isNaN(seconds)) {
		return '00:00';
	}
	if (seconds < 0) seconds = 0;
	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
export const formatDate = (dateString?: string): string => {
	const dateParts = dateString?.split('-');
	const year = dateParts?.[0]?.substring(2);
	const month = dateParts?.[1];
	const day = dateParts?.[2];

	return `${year}.${month}.${day}`;
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
