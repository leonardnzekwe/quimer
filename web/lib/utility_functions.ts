export function formatTimeFromMilliseconds(totalMilliseconds: number) {
    // Convert milliseconds to seconds
    const totalSeconds = Math.floor(totalMilliseconds / 1000);

    // Calculate hours, minutes, and remaining seconds
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Format the time components
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    // Construct the time string
    const timeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    return timeString;
}

export function formatDate(dateString: string) {
    try {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short'
        };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    } catch (error) {
        console.error('Error formatting date:', error);
        return dateString ? dateString : 'Invalid date';
    }
}