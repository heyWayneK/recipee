import React from "react";
import { useFormContext } from "react-hook-form";

// Define the interface for the props
interface DateRangeSimpleV1Props {
  name: string; // Main name for the group (optional, but can be useful for grouping)
  nameStart?: string; // Name attribute for the start date input
  nameEnd?: string; // Name attribute for the end date input
  label?: string; // Label text for the date range selector
  required?: boolean; // Whether both dates are required
  minDate?: string; // Minimum allowed date (e.g., "2023-01-01")
  maxDate?: string; // Maximum allowed date (e.g., "2023-12-31")
  errorStart?: string; // External error message for the start date
  errorEnd?: string; // External error message for the end date
  className?: string; // Additional class names for styling
}

function calculateDateOffset(daysOffset: number): string {
  const date = new Date(); // Start with today's date
  date.setDate(date.getDate() + daysOffset); // Add or subtract days

  // Format the date as YYYY-MM-DD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const DateRangeSimpleV1 = ({
  name,
  nameStart = `${name}-start`, // Default name for the start date
  nameEnd = `${name}-end`, // Default name for the end date
  label = "My Date Range",
  required = true,
  // FUTURE:
  // minDate = calculateDateOffset(-1), // Default: yesterday
  // maxDate = calculateDateOffset(30), // Default: 30 days in the future
  minDate = null, // Default: yesterday
  maxDate = null, // Default: 30 days in the future
  errorStart,
  errorEnd,
  className,
}: DateRangeSimpleV1Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {/* Group Label */}
      {label && (
        <label className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Start Date Input */}
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col ">
          <label htmlFor={nameStart} className="text-xs text-gray-600">
            Start Date
          </label>
          <input
            id={nameStart}
            type="date"
            min={minDate}
            max={maxDate}
            {...register(nameStart, {
              required: required ? `${name} - Start Date is required` : false,
            })}
            className={` px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[nameStart] ? "border-red-500" : "border-gray-300"}`}
          />
          {(errorStart || (errors[nameStart]?.message as string)) && <div className="text-red-500 text-xs">{errorStart || (errors[nameStart]?.message as string)}</div>}
        </div>

        {/* End Date Input */}
        <div className="flex flex-col">
          <label htmlFor={nameEnd} className="text-xs text-gray-600">
            End Date
          </label>
          <input
            id={nameEnd}
            type="date"
            min={minDate}
            max={maxDate}
            {...register(nameEnd, {
              required: required ? `${name} - End Date is required` : false,
            })}
            className={` px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[nameEnd] ? "border-red-500" : "border-gray-300"}`}
          />
          {(errorEnd || (errors[nameEnd]?.message as string)) && <div className="text-red-500 text-xs">{errorEnd || (errors[nameEnd]?.message as string)}</div>}
        </div>
      </div>
    </div>
  );
};

export default DateRangeSimpleV1;
