import React from "react";
import { useFormContext } from "react-hook-form";

// Define the interface for the props
interface InputFieldProps {
  name: string; // Name attribute for the input field
  label?: string; // Label text for the input field
  type?: string; // Type of input (e.g., "text", "email", "password")
  required?: boolean; // Whether the field is required
  pattern?: { value: RegExp; message: string }; // Regex pattern validation
  placeholder?: string; // Placeholder text
  error?: string; // External error message
  className?: string; // Additional class names for styling
}

// const Hidden = ({ name, label, type = "hidden", required = false, pattern, placeholder, error, className }: InputFieldProps) => {
const Hidden = ({ name, label, type = "hidden", required = false, pattern, placeholder }: InputFieldProps) => {
  const {
    register,
    // formState: { errors },
  } = useFormContext();

  return (
    <input
      id={name}
      type={type}
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
    />
  );
};

export default Hidden;
