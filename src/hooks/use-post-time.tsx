export const usePostTime = (date: string) => {
    const postDate = new Date(date);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - postDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    const secondsDifference = Math.floor(timeDifference / 1000);

    let timeAgo = "";

    if (daysDifference > 0) {
        timeAgo = `${daysDifference}d`;
    } else if (hoursDifference > 0) {
        timeAgo = `${hoursDifference}h`;
    } else if (minutesDifference > 0) {
        timeAgo = `${minutesDifference}m`;
    } else {
        timeAgo = `${secondsDifference}s`;
    }

    return timeAgo;
}