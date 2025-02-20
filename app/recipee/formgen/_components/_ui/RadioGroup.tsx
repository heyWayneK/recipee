import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

// Define the interface for the props
interface RadioButtonGroupProps {
  name: string; // Name attribute for the radio group
  label?: string; // Label text for the group
  options: { value: string; label: string }[]; // Array of options for the radio buttons
  required?: boolean; // Whether the radio group is required
  error?: string; // External error message
  className?: string; // Additional class names for styling
}

const RadioButtonGroup = ({ name, label, options, required, error, className }: RadioButtonGroupProps) => {
  const {
    register,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (getValues(name)) {
      setSelectedValue(getValues(name));
      setValue(name, getValues(name));
    }
  }, [name, setValue, getValues]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    setValue(name, newValue);
    clearErrors(name);
  };

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {/* Group Label */}
      {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {/* Radio Buttons */}
      <div className="flex flex-col space-y-2">
        {options.map(({ value, label: optionLabel }) => (
          <label key={value} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              id={`${name}-${value}`}
              value={value}
              checked={selectedValue === value}
              {...register(name, { required: required ? `${label || "This field"} is required` : false })}
              onChange={handleChange}
              className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm">{optionLabel}</span>
          </label>
        ))}
      </div>
      {/* Error Message */}
      {/* {(error || (errors[name]?.message as string)) && <div className="text-red-500 text-xs">{error || (errors[name]?.message as string)}
      </div>} */}
      {errors[name] && <span className="text-red-500 text-sm">{errors[name]?.message as string}</span>}
    </div>
  );
};

export default RadioButtonGroup;

// const RadioButtonGroup = ({ name, label, options, required, error, className }: RadioButtonGroupProps) => {
//   const {
//     register,
//     getValues,
//     setValue,
//     formState: { errors },
//   } = useFormContext();

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     console.log("Radio Button  UPDATE ", name, "===", event.target.value);
//     setValue(name, event.target.value);
//     // trigger(name);
//   };

//   return (
//     <div className={`flex flex-col space-y-2 ${className}`}>
//       {/* Group Label */}
//       {label && (
//         <label htmlFor={name} className="text-sm font-medium">
//           {label}
//           {required && <span className="text-red-500">*</span>}
//         </label>
//       )}

//       {/* Radio Buttons */}
//       <div className="flex flex-col space-y-2">
//         {options.map(
//           ({ value, label: optionLabel }) => (
//             console.log("Radio Button Group  ", getValues(name), "===", value),
//             (
//               <label key={value} className="flex items-center space-x-2 cursor-pointer">
//                 <input
//                   type="radio"
//                   id={`${name}-${value}`}
//                   value={value}
//                   onClick={() => handleChange}
//                   checked={getValues(name) === value}
//                   {...register(name, { required: required ? `${label || "This field"} is required` : false })}
//                   className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
//                 />
//                 <span className="text-sm">{optionLabel}</span>
//               </label>
//             )
//           )
//         )}
//       </div>

//       {/* Error Message */}
//       {(error || (errors[name]?.message as string)) && <div className="text-red-500 text-xs">{error || (errors[name]?.message as string)}</div>}
//     </div>
//   );
// };
