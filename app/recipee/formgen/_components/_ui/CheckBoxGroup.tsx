import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

// Define the interface for the props
interface MultiCheckboxProps {
  name: string; // Name attribute for the checkbox group
  label?: string; // Label text for the checkbox group
  options: { value: string; label: string }[] | undefined; // Array of options for the checkboxes
  required?: boolean; // Whether at least one checkbox must be selected
  error?: string; // External error message
  className?: string; // Additional class names for styling
}

const MultiCheckbox = ({ name, label, options, required = false, error, className = "" }: MultiCheckboxProps) => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const [selectedValues, setSelectedValues] = useState<string[] | []>([]);

  useEffect(() => {
    if (getValues(name)?.length > 0) {
      setSelectedValues(getValues(name));
      setValue(name, getValues(name));
    }
  }, [name, setValue, getValues]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const newSelectedValues = event.target.checked ? [...selectedValues, newValue] : selectedValues.filter((value) => value !== newValue);

    setSelectedValues(newSelectedValues);
    setValue(name, newSelectedValues);
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

      {/* Checkboxes */}
      <div className="flex flex-col space-y-2">
        {options &&
          options?.map(({ value, label: optionLabel }) => (
            <label key={value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                id={`${name}-${value}`}
                {...register(name, {
                  required: required ? `${label || "This field"} is required` : false,
                  onChange: handleChange,
                })}
                value={value}
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm">{optionLabel}</span>
            </label>
          ))}
      </div>

      {/* Error Message */}
      {(error || (errors[name]?.message as string)) && <div className="text-red-500 text-xs">{error || (errors[name]?.message as string)}</div>}
    </div>
  );
};

export default MultiCheckbox;

// const MultiCheckbox = ({ name, label, options, required = false, error, className }: MultiCheckboxProps) => {
//   const {
//     register,
//     getValues,
//     setValue,
//     formState: { errors },
//   } = useFormContext();

//   const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);

//   useEffect(() => {
//     if (getValues(name)) {
//       setSelectedValue(getValues(name));
//       setValue(name, getValues(name));
//     }
//   }, [name, setValue, getValues]);

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newValue = event.target.value;
//     setSelectedValue(newValue);
//     console.log("CHECKBOX GROUP Button  UPDATE ", name, "===", newValue);
//     setValue(name, newValue);
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

//       {/* Checkboxes */}
//       <div className="flex flex-col space-y-2">
//         {options.map(
//           ({ value, label: optionLabel }) => (
//             console.log("Checkbox Group  _____"),
//             console.log("selectedvalue  ", selectedValue),
//             console.log("options  ", options),
//             console.log("value  ", value),
//             console.log("optionLabel  ", optionLabel),
//             console.log("getValues(name)  ", getValues(name)),
//             (
//               // console.log("Checkbox Group  ", options?.includes((option) => option.value === value).tostring(), "===", optionLabel),
//               <label key={value} className="flex items-center space-x-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   id={`${name}-${value}`}
//                   checked={selectedValue?.includes(value) || false}
//                   // checked={selectedValue === value}
//                   onChange={handleChange}
//                   value={value}
//                   {...register(name, {
//                     required: required ? `${label || "This field"} is required` : false,
//                   })}
//                   className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
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

// export default MultiCheckbox;
