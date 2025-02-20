import React, { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { DateRangePicker, Range } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme CSS file
import { DateRangeSelectorV2Props } from "../../_types/formGen_types";

// FUTURE: - LOCALES for calendar language and style
// import * as locales from "react-date-range/dist/locale";
const nameMapper = {
  ar: "Arabic",
  bg: "Bulgarian",
  ca: "Catalan",
  cs: "Czech",
  cy: "Welsh",
  da: "Danish",
  de: "German",
  el: "Greek",
  enGB: "English (United Kingdom)",
  enUS: "English (United States)",
  eo: "Esperanto",
  es: "Spanish",
  et: "Estonian",
  faIR: "Persian",
  fi: "Finnish",
  fil: "Filipino",
  fr: "French",
  // THERE ARE MORE...
};

// EXCLUDE WEEKENDS
function getWeekendDates(weeksBefore: number, weeksAfter: number) {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - weeksBefore * 7);
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + weeksAfter * 7);
  const weekends: Date[] = [];
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      weekends.push(new Date(currentDate)); // Push a copy of the Date object
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return weekends;
}

// const DateRangeSelectorV2:React.FC<DateRangeSelectorV2Props> = ({children,className=''}) => {
const DateRangeSelectorV2: React.FC<DateRangeSelectorV2Props> = ({
  name,
  label = "My Date Range",
  required = false,
  // FUTURE:
  // minDate = new Date(new Date().setMonth(new Date().getMonth() - 1)), // Default: today
  // maxDate = new Date(new Date().setMonth(new Date().getMonth() + 3)), // Default: 30 days in the future
  minDate = null,
  maxDate = null,
  excludedDates = [],
  minDaysSelected = 1, // 2 days minimum, else Error
  error,
  className,
  color = "#1427a6",
  excludeWeekends = false,
}: // initialDates = null,
DateRangeSelectorV2Props) => {
  const {
    setValue,
    register,
    setError,
    getValues,
    clearErrors,
    trigger,
    formState: { errors },
  } = useFormContext();

  const [state, setState] = useState<Range>({
    startDate: null,
    endDate: null,
    key: "",
    color: "grey",
    autoFocus: true,
    disabled: false,
    showDateDisplay: false,
  });

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const startFormElement = `${name}-start`;
  const endFormElement = `${name}-end`;

  const errorMessage = `Select an end date at least ${minDaysSelected - 1} day(s) from your start date.`;

  const setValidationErrors = useCallback(() => {
    // setError(startFormElement, { type: "required", message: `${startFormElement} date - You must select at least ${minDaysSelected} day(s).` });
    setError(endFormElement, { type: "required", message: errorMessage });
    trigger(endFormElement);
    // trigger([startFormElement, endFormElement]);
  }, [setError, endFormElement, minDaysSelected, trigger]);

  const clearValidationErrors = useCallback(() => {
    clearErrors(startFormElement);
    clearErrors(endFormElement);
  }, [clearErrors, startFormElement, endFormElement]);

  const checkMinimumDays = useCallback(
    (startDate: Date, endDate: Date) => {
      // ERROR IF - Check if the selected range meets the minimum days requirement
      // console.log("CHECKING MINIMUM DAYS: ", startDate, endDate);
      if (startDate && endDate && Math.ceil((endDate?.getTime() - startDate?.getTime()) / (1000 * 60 * 60 * 24)) + 1 < minDaysSelected) {
        // alert(`You must select at least ${minDaysSelected} day(s).`);
        setValidationErrors();
        // return;
      } else {
        clearValidationErrors();
      }
    },
    [minDaysSelected, setValidationErrors, clearValidationErrors]
  );
  useEffect(() => {
    register(startFormElement, { required: errorMessage });
    register(endFormElement, { required: errorMessage });
    // setValue(startFormElement, "");
    // setValue(endFormElement, "");

    // RESIZE EVENT - listener to stack calendars vertically on small screens
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    // RESIZE EVENT - listener to stack calendars vertically on small screens
    window.addEventListener("resize", handleResize);

    // CLEAN UP FUNC - the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [register, startFormElement, endFormElement, name, setValue]);

  useEffect(() => {
    // console.log("start date end date VALUES", getValues("startDate"), getValues("endDate"));
    const startDate = new Date(getValues("startDate"));
    const endDate = new Date(getValues("endDate"));
    if (startDate && endDate) {
      // console.log("REGISTERING INITIAL DATES: ", getValues("startDate"), getValues("endDate"));
      setState({ startDate, endDate });
      checkMinimumDays(startDate, endDate);
      // clearValidationErrors();
    } else {
      // console.log("VALIDATION ERROR SET");
      // setValidationErrors();
    }
  }, [getValues, setValidationErrors, clearValidationErrors, checkMinimumDays]);

  // Handle date range selection
  const handleSelect = (ranges: Range) => {
    const dates = Object.values(ranges)[0];
    // const { startDate, endDate } = dates;
    const startDate = new Date(dates.startDate);
    const endDate = new Date(dates.endDate);

    checkMinimumDays(startDate, endDate);

    setState({ startDate, endDate });
    // setState(dates);
    setValue(startFormElement, startDate.toISOString().split("T")[0]);
    setValue(endFormElement, endDate.toISOString().split("T")[0]);
    trigger([startFormElement, endFormElement]);
  };

  // Helper function to format a date as YYYY-MM-DD
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // console.log("DateRangev2 Errors: ", errors);
  // console.log("DateRangev2 State:", state);

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {/* Group Label */}
      {label && (
        <label className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <DateRangePicker
        // Modify function as needed
        disabledDates={excludeWeekends ? getWeekendDates(4, 12) : excludedDates} // Disable specific dates
        onChange={handleSelect}
        months={2} // Show two months at a time
        showMonthAndYearPickers={true}
        ranges={[state]}
        direction={screenWidth < 820 ? "vertical" : "horizontal"}
        minDate={minDate}
        maxDate={maxDate}
        className="w-full" // Ensure it takes full width
        rangeColors={[color]}
        weekStartsOn={1} // start week on Monday
        calendarFocus="forwards"
        preventSnapRefocus={false}
        // focusedRange={[0, 1]}
        // FUTURE: OTHER PARAMS TO POTENTIALLY USE:_____
        // ariaLabels={{
        //   dateInput: {
        //     selection1: { startDate: "start date input of selction 1", endDate: "end date input of selction 1" },
        //     selection2: { startDate: "start date input of selction 2", endDate: "end date input of selction 2" },
        //   },
        //   monthPicker: "month picker",
        //   yearPicker: "year picker",
        //   prevButton: "previous month button",
        //   nextButton: "next month button",
        // }}
      />

      {/* Error Message */}
      {/* {(error || (errors[name]?.message as string)) && <div className="text-red-500 text-xs">{error || (errors[name]?.message as string)}</div>} */}
      {/* {error || (errors[startFormElement] && <div className="text-red-500 text-xs">{errors[startFormElement]?.message as string}</div>)} */}

      {/* Error Message for End Date */}
      {error || (errors[endFormElement] && <div className="text-red-500 text-xs">{errors[endFormElement]?.message as string}</div>)}
    </div>
  );
};

export default DateRangeSelectorV2;

//FUTURE: - ADDITIONS IN FUTURE

{
  /* FUTURE: - LOCALES
        <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
        <select
        style={{ margin: '20px auto' }}
        onChange={e => setLocale(e.target.value)}
        value={locale}
        >
        {localeOptions.map((option, i) => (
        <option value={option.value} key={i}>
          {option.label}
        </option>
        ))}
        </select>
        <Calendar onChange={item => setDate(item)}
        locale={locales[locale]} date={date} />
        </div>; 
*/
}
// FUTURE: To add Locales
//   const localeOptions = Object.keys(locales)
//   .map(key => ({
//     value: key,
//     label: `${key} - ${nameMapper[key] || ''}`
//   }))
//   .filter(item => nameMapper[item.value]);
// const [locale, setLocale] = React.useState('ja');
