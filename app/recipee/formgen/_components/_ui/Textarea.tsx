import React from "react";
import { useFormContext } from "react-hook-form";

// Define the interface for the props
interface TextFieldProps {
  name: string; // Name attribute for the text field
  label?: string; // Label text for the text field
  type?: string;
  required?: boolean; // Whether the field is required
  placeholder?: string; // Placeholder text
  rows?: number; // Number of rows for textarea (only applies if type is "textarea")
  error?: string; // External error message
  className?: string; // Additional class names for styling
}

const TextField = ({
  name,
  label,
  type = "textarea",
  required = false,
  placeholder,
  rows = 4, // Default rows for textarea
  error,
  className,
}: TextFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      {/* Label */}
      {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Text Field */}
      {type === "textarea" ? (
        // Render a textarea for multi-line input
        <textarea
          id={name}
          placeholder={placeholder}
          rows={rows}
          {...register(name, {
            required: required ? `${label || "This field"} is required` : false,
          })}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[name] ? "border-red-500" : "border-gray-300"}`}
        />
      ) : (
        // Render a single-line text input
        <input
          id={name}
          type="text"
          placeholder={"placeholder"}
          {...register(name, {
            required: required ? `${label || "This field"} is required` : false,
          })}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[name] ? "border-red-500" : "border-gray-300"}`}
        />
      )}

      {/* Error Message */}
      {(error || (errors[name]?.message as string)) && <div className="text-red-500 text-xs">{error || (errors[name]?.message as string)}</div>}
    </div>
  );
};

export default TextField;
