// format date object based on certain criteria
export const formatDate = (date, created) => {
    switch (created) {
        case 'recently':
            /*
            ** less than 24 hours ago
            ** Thursday at 4pm
            */
            return getDayOfWeek(date) + ' at ' + date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        case 'thisYear':  
            /*
            ** this year
            ** April 1st at 2pm
            */
            return getMonthFromDate(date) + ' ' + formatDayWithSuffix(date.getDay()) + 'at' + date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })            
        default:
            /*
            ** over a year ago
            ** April 1st, 2023 at 2pm
            */
            return getMonthFromDate(date) + ' ' + formatDayWithSuffix(date.getDay()) + ', ' + date.getFullYear() + ' at ' + date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    }
}

// at nth, st, rd, nd suffixes based on date
export const formatDayWithSuffix = (day) => {
    if (day >= 11 && day <= 13) {
        return day + 'th';
    }

    switch (day % 10) {
        case 1:  return day + 'st';
        case 2:  return day + 'nd';
        case 3:  return day + 'rd';
        default: return day + 'th';
    }
}

// get day of the week based on date
export const getDayOfWeek = (date) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = date.getDay();
    
    return daysOfWeek[dayIndex];
}

// get month from numeric month
export const getMonthFromDate = (date) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthIndex = date.getMonth();
    
    return months[monthIndex];
}

// compare timestamps and determine the difference
export const timeAgo = (commentDate, currentDate) => {
    let timeDiff = Math.abs(commentDate.getTime() - currentDate.getTime())

    return timeDiff
}