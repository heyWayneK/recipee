import React from "react";
import { useFormContext } from "react-hook-form";

// Define the interface for the props
interface InputFieldProps {
  name: string; // Name attribute for the input field
  label: string; // Label text for the input field
  type?: string; // Type of input (e.g., "text", "email", "password")
  required: boolean; // Whether the field is required
  pattern?: { value: RegExp; message: string }; // Regex pattern
  placeholder?: string; // Placeholder text
  error?: string; // External error message
  className?: string; // Additional class names for styling
}

const Input = ({ name, label, type = "text", required = false, pattern, placeholder, error, className }: InputFieldProps) => {
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

      {/* Input Field */}
      <input
        id={name}
        type={type}
        autoComplete="off"
        placeholder={placeholder}
        {...register(name, {
          required: required ? `${label || "This field"} is required` : false,
          pattern: pattern?.value
            ? {
                value: pattern.value,
                message: pattern.message,
              }
            : undefined,
        })}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[name] ? "border-red-500" : "border-gray-300"}`}
      />

      {/* Error Message */}
      {(error || (errors[name]?.message as string)) && <div className="text-red-500 text-xs">{error || (errors[name]?.message as string)}</div>}
    </div>
  );
};

export default Input;
