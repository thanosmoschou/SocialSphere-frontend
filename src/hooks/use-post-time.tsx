export const usePostTime = (date: string) => {
    const postDate = new Date(date);
    const currentDate = new Date();
    
    // Add 3 hours to account for the timezone difference
    const adjustedPostDate = new Date(postDate.getTime() + (3 * 60 * 60 * 1000));
    
    const timeDifference = currentDate.getTime() - adjustedPostDate.getTime();
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