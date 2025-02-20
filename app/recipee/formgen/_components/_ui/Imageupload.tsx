import React, { useState, useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";

// Define the interface for the props
interface ImageUploadProps {
  name: string; // Name attribute for the file input
  label?: string; // Label text for the upload field
  required?: boolean; // Whether at least one image upload is required
  accept?: string; // File types to accept (e.g., "image/*")
  error?: string; // External error message
  className?: string; // Additional class names for styling
}

const ImageUpload = ({ name, label, required = false, accept = "image/*", error, className }: ImageUploadProps) => {
  const {
    register,
    setValue,
    getValues,
    trigger, // Trigger validation manually
    formState: { errors },
  } = useFormContext();

  const [previewUrls, setPreviewUrls] = useState<string[]>([]); // Array of preview URLs
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to the hidden file input

  useEffect(() => {
    if (getValues(name)) {
      // console.log("REGISTERING INITIAL DATES: ", getValues("startDate"), getValues("endDate"));
      setPreviewUrls([...getValues(name)]);
    }
  }, [setPreviewUrls, getValues, name]);

  // Handle file selection or drag-and-drop
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files); // Convert FileList to an array
      setValue(name, newFiles); // Update form state with the selected files
      const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file)); // Generate preview URLs
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls]); // Append new previews to existing ones
      trigger(name); // Manually trigger validation for the field
    }
  };

  // Handle drag-and-drop events
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files); // Convert FileList to an array
      setValue(name, newFiles); // Update form state with the dropped files
      const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file)); // Generate preview URLs
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls]); // Append new previews to existing ones
      trigger(name); // Manually trigger validation for the field
    }
  };

  // Remove a specific image by its index
  const removeImage = (index: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Stop the click event from propagating to the parent drop zone
    setPreviewUrls((prev) => {
      const updatedPreviews = prev.filter((_, i) => i !== index);
      return updatedPreviews;
    });
  };

  // Trigger the hidden file input when the drop zone is clicked
  const handleZoneClick = () => {
    fileInputRef.current?.click(); // Programmatically trigger the file input
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

      {/* Drop Zone */}
      <div
        onClick={handleZoneClick} // Open file browser when clicked
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${previewUrls.length > 0 ? "border-green-500" : "border-gray-300 hover:border-blue-500"}`}
      >
        {previewUrls.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative">
                <img src={url} alt={`Preview ${index}`} className="w-20 h-20 object-cover rounded-md" />
                <button
                  type="button"
                  onClick={(event) => removeImage(index, event)} // Pass the event to stop propagation
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Drag & drop images here or click to select</p>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        id={name}
        type="file"
        accept={accept}
        multiple // Allow multiple file selection
        {...register(name, {
          required: required ? `${label || "This field"} is required` : false,
        })}
        onChange={handleFileChange}
        ref={fileInputRef} // Reference to the file input
        className="hidden" // Hide the file input visually
      />

      {/* Error Message */}
      {(error || (errors[name]?.message as string)) && <div className="text-red-500 text-xs">{error || (errors[name]?.message as string)}</div>}
    </div>
  );
};

export default ImageUpload;
