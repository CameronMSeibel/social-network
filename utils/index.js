module.exports = {
    /**
     * Formats a JavaScript date to be more readable.
     * @param {Date} date 
     * @returns {String} Formatted date string
     */
    formatDate: (date) => {
        months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        hours = (hour) => {
            if(hour % 12){
                return hour - 12;
            }
            if(!hour){
                return 12;
            }
            return hour;
        };
        period = (hour) => {
            if(hour % 12 || !hour){
                return "p.m.";
            }
            return "a.m.";
        };
        day = (day) => {
            switch(day){
                case 1:
                    return "1st";
                case 2:
                    return "2nd";
                case 3:
                    return "3rd";
                default:
                    return `${day}th`;
            }
        };
        return `${months[date.getMonth()]} ${day(date.getDate())}, ${date.getFullYear()} at ${hours(date.getHours())}:${date.getMinutes()} ${period(date.getHours())}`;
    },
    /**
     * Validates an ID input
     * @param {string} id hexcharacter string representing an object ID
     * @returns {boolean} whether or not the id is an acceptable object ID
     */
    validID: (id) => {
        return id.match(/[a-f\d]{24}/);
    }
};