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

        };
        return `${months[date.getMonth()]} ${day(date.getDay)} ${date.getFullYear} at ${hours(date.getHours)}:${date.getMinutes} ${period(date.getHours)}`;
    }
};