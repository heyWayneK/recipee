import React from "react";
import { useFormContext } from "react-hook-form";

// Define the interface for the props
interface SelectFieldProps {
  name: string; // Name attribute for the select field
  label?: string; // Label text for the select field
  options: { value: string; label: string }[]; // Array of options for the dropdown
  required?: boolean; // Whether the field is required
  placeholder?: string; // Placeholder text for the select field
  error?: string; // External error message
  selectMultiple?: boolean; // Whether multiple selections are allowed
  className?: string; // Additional class names for styling
}

const Select = ({ name, label, options, required = false, placeholder, error, selectMultiple = false, className }: SelectFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const optionsWithBlank = [{ value: "", label: "Select" }, ...options];

  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      {/* Label */}
      {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Select Field */}
      <select
        id={name}
        // value={options.includes(getValues("dd")) ? getValues(name) : ""}
        multiple={selectMultiple}
        {...register(name, {
          required: required ? `${label || "This field"} is required` : false,
        })}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[name] ? "border-red-500" : "border-gray-300"}`}
      >
        {/* Placeholder Option */}
        {placeholder && <option value="">{placeholder}</option>}

        {/* Dynamic Options */}
        {optionsWithBlank.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      {/* Error Message */}
      {(error || (errors[name]?.message as string)) && <div className="text-red-500 text-xs">{error || (errors[name]?.message as string)}</div>}
    </div>
  );
};

export default Select;
