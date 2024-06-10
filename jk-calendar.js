/**
 * 
 * Author: Jawad khan
 * Date: 10 June 2024
 * 
 * ******************************************************
 * A light weight Library for calendar in vanilla JavaScript
 * ******************************************************
 */


const JK_Calendar = (config = {}) => {

    let __date__ = new Date();
    let __y__ = config.year;
    let __m__ = config.month;

    let __config__ = {
        weekDayLabel: "short_name",
        year: null,
        month: null
    };

    __config__ = {
        ...__config__,
        ...config
    }

    if (!__config__.year && !__config__.month) {
        __m__ = __date__.getMonth();
        __y__ = __date__.getFullYear();
        __d__ = __date__.getDate();

        __config__.month = __m__ + 1;
        __config__.year = __y__;
    } else {
        __m__ = __config__.month - 1;
        __y__ = __config__.year;
        __d__ = __date__.getDate();
    }

    console.table(__config__);


    let __calendar__ = {
        year: __y__,
        month: __m__ + 1,
        current_date: __d__,
        days: []
    };
    
    
    let __months__ = [
        {
            index: 1,
            short_name: "Jan",
            full_name: "January",
        },
        {
            index: 2,
            short_name: "Feb",
            full_name: "February",
        },
        {
            index: 3,
            short_name: "Mar",
            full_name: "March",
        },
        {
            index: 4,
            short_name: "Apr",
            full_name: "April",
        },
        {
            index: 5,
            short_name: "May",
            full_name: "May",
        },
        {
            index: 6,
            short_name: "Jun",
            full_name: "June",
        },
        {
            index: 7,
            short_name: "Jul",
            full_name: "July",
        },
        {
            index: 8,
            short_name: "Aug",
            full_name: "Augest",
        },
        {
            index: 9,
            short_name: "Sep",
            full_name: "September",
        },
        {
            index: 10,
            short_name: "Oct",
            full_name: "Octobor",
        },
        {
            index: 11,
            short_name: "Nov",
            full_name: "November",
        },
        {
            index: 12,
            short_name: "Dec",
            full_name: "December",
        }
    ];
    

    let __weekDays__ = [
        {
            short_name: "S",
            full_name: "Sunday",
        },
        {
            short_name: "M",
            full_name: "Monday",
        },
        {
            short_name: "T",
            full_name: "Tuesday",
        },
        {
            short_name: "W",
            full_name: "Wednesday",
        },
        {
            short_name: "T",
            full_name: "Thursday",
        },
        {
            short_name: "F",
            full_name: "Friday",
        },
        {
            short_name: "S",
            full_name: "Saturday",
        },
    ];

    
    let __days__ = [];

    let __totalNumberOfDaysInCurrentMonth__ = 0;
    let __currentMonthStartingDay__  = 0;
    let __currentMonthStartDayIndex__ = 0;
    let __totalNumberOfDaysInPreviousMonth__ = 0;


    const __getDaysInMonth__ = (month = __m__, year = __y__) => {
        return new Date(year, month + 1, 0).getDate();
    }

    const __getDayOfWeek__ = (d, key = "short_name", year = __y__, month = __m__) => {
        d = new Date(year, month, d);
        return __weekDays__[d.getDay()][key];
    }

    const __findWeekDayIndex__ = (weekday, __weekdays__) => {
        let index = -1;
        for(let i = 0; i < __weekdays__.length; i++) {
            if (__weekdays__[i].full_name === weekday) {
                index = i;
                break;
            }
        }

        return index;
    }


    const __getPreviousMonthDatesToFillCalendarSlots__ = () => {
        
        if (__currentMonthStartDayIndex__ >= 0) {
            let countDays = __totalNumberOfDaysInPreviousMonth__;

            for (let i = 0; i < __currentMonthStartDayIndex__; i++) {
                __days__.unshift({
                    label: __getDayOfWeek__(countDays, __config__.weekDayLabel, 2024, __m__ - 1),
                    day: countDays
                });
                countDays--;
            }
        }
    }


    const __getNextMonthDatesToFillCalendarSlots__ = () => {
        let start = 1;
        for (let i = __days__.length; i < 42; i++) {
            __days__.push({
                label: __getDayOfWeek__(start, __config__.weekDayLabel, 2024, __m__ + 1),
                day: start
            });

            start++;
        }
    }


    const __generateCalendarDates__ = () => {

        __days__ = [];

        __bootCalendar__();

        /**
         * 
         * NOTE: previous month dates and next month dates are required only to fill 42 slots in calendar.
         */

        // current month starting day in not sunday than fill calendar slots from previous month last dates.
        if (__currentMonthStartingDay__ != "Sunday") {

            // prepend previous month dates to fill calendar slots.
            __getPreviousMonthDatesToFillCalendarSlots__();
        }

        // Generate current month dates
        for (let i = 1; i <=  __totalNumberOfDaysInCurrentMonth__; i++) {
            __days__.push({
                label: __getDayOfWeek__(i, __config__.weekDayLabel),
                day: i
            });
        }


        // days count is less than 42 than fill calendar slots from next month initial dates.
        if (__days__.length < 42) {

            // append next month dates to fill calendar slots.
            __getNextMonthDatesToFillCalendarSlots__();
        }

        // set calendar days
        __calendar__.days = __days__;
    }


    const __getLabels__ = () => {
        let labels = [];

        __weekDays__.forEach(day => {
            labels.push(day[__config__.weekDayLabel]);
        });

        return labels;
    }


    const __bootCalendar__ = () => {
        __totalNumberOfDaysInCurrentMonth__ = __getDaysInMonth__();
        __currentMonthStartingDay__  = __getDayOfWeek__(1, "full_name");
        __currentMonthStartDayIndex__ = __findWeekDayIndex__(__currentMonthStartingDay__, __weekDays__);
        __totalNumberOfDaysInPreviousMonth__ = __getDaysInMonth__(__m__ - 1);
    }



    __generateCalendarDates__();


    /**
     * 
     * 
     * ************************************
     * 
     * Calendar API's
     * 
     * ************************************
     * 
     * User is supposed to interact with the following methods only.
     * 
     */


    __calendar__.getMonthFullName = () => {
        return __months__[__m__]['full_name'];
    }

    __calendar__.getMonthShortName = () => {
        return __months__[__m__]['short_name'];
    }

    __calendar__.getMonthNumber = () => {
        return __months__[__m__]['index'];
    }

    __calendar__.getFullYear = () => {
        return __y__;
    }        

    __calendar__.getCurrentDate = () => {
        return __d__;
    }        

    __calendar__.getCurrentDayFullName = () => {
        return __getDayOfWeek__(__calendar__.getCurrentDate, "full_name");
    }        

    __calendar__.getCurrentDayShortName = () => {
        return __getDayOfWeek__(__calendar__.getCurrentDate, "short_name");
    }     

    __calendar__.getMonths = () => {
        return __months__;
    }
    
    __calendar__.getLabels = () => {
        return __getLabels__();
    }

    __calendar__.getCalendar = () => {
        return {
            labels: __getLabels__(),
            days: __calendar__.days
        };

        return __calendar__.days;
    }  
    
    __calendar__.setMonth = (m) => {

        if (typeof m != 'number' || m.length > 2) throw new Error("Invalid month provided to setMonth method! setMonth method is expecting a valid number between 1 to 12.");

        __m__ = m - 1;
        __config__.month = __m__;
        __calendar__.month = __m__ + 1;

        __generateCalendarDates__();
    }
    
    __calendar__.setYear = (y) => {

        if (typeof y != 'number' || y.length < 4) throw new Error("Invalid year provided to setYear method! setYear method is expecting a valid year. for example: 2024");

        __y__ = y;
        __config__.year = __y__;
        __calendar__.year = __y__;

        __generateCalendarDates__();
    }

    __calendar__.setMonthYear = (y, m) => {

        if (typeof y != 'number' || y.length < 4) throw new Error("Invalid year provided to setYear method! setYear method is expecting a valid year. for example: 2024");

        __y__ = y;
        __config__.year = __y__;
        __calendar__.year = __y__;


        if (typeof m != 'number' || m.length > 2) throw new Error("Invalid month provided to setMonth method! setMonth method is expecting a valid number between 1 to 12.");

        __m__ = m - 1;
        __config__.month = __m__;
        __calendar__.month = __m__ + 1;

        __generateCalendarDates__();

    }

    __calendar__.setWeekDayLabel = (type = "short_name") => {

        if (typeof type != 'string' && !["short_name", "full_name"].includes(type)) throw new Error("Invalid label type provided to set method! setWeekDayLabel method is expecting 'short_name' or 'full_name'.");

        __config__.weekDayLabel = type;

        __generateCalendarDates__();

    }

    __calendar__.reGenerate = () => {
        __generateCalendarDates__();
    }

    __calendar__.calendarPrettyPrint = () => {
        console.log(__calendar__);
        console.table(__calendar__.getCalendar());
    }

    return __calendar__;
};


export default JK_Calendar;
