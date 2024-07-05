export function timeFormatter(time: string): string {
    const currentDate = new Date();
    const targetDate = new Date(time);

    const seconds = Math.floor(
        (currentDate.getTime() - targetDate.getTime()) / 1000
    );
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    if (months > 0) {
        return months === 1 ? `${months} month ago` : `${months} months ago`;
    } else if (days > 0) {
        return days === 1 ? `${days} day ago` : `${days} days ago`;
    } else if (hours > 0) {
        return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`;
    } else if (minutes > 0) {
        return minutes === 1
            ? `${minutes} minute ago`
            : `${minutes} minutes ago`;
    } else {
        return seconds < 30 ? `just now` : `${seconds} seconds ago`;
    }
}
