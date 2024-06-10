# simple-calendar
A light weight but powerfull vanilla javascript calendar. without markup. 


## Basic usage
```
import JK_Calendar from "./jk-calendar";

const myCalendar = JK_Calendar({
  weekDayLabel: "short_name"
});

```

## Available methods:
- getMonthFullName()
- getMonthShortName()
- getMonthNumber()
- getFullYear()
- getCurrentDate()
- getCurrentDayFullName()
- gtCurrentDayShortName()
- getMonths() // January to December
- getLabels() // week days labels
- getCalendar() // returns labels and days for the specified month/year. By default JK_Calendar will use current month/year if not provided.
- setMonth(m) // "m" is the number of months from [1 - 12]
- setYear(y) // year. example: 2024
- setMonthYear(y, m) // set month and year
- setWeekDayLabel(type) // type must be either "short_name" or "full_name".
- reGenerate() // to refresh calendar.
- calendarPrettyPrint() // can be used in console only. to print the calendar in a tabular format.

## Example Calendar Created With Tailwindcss and JK_Calendar

![image](https://github.com/jawadk116/simple-calendar/assets/78857810/73309f6b-359e-421f-b0ac-b8d00d7f336c)

