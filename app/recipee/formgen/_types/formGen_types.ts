import React from "react";
import { FieldValues } from "react-hook-form";

export type KeyValuePairs<T> = Array<Record<string, T>>;

export type DynamicObjectArray = Array<Record<string, any>>;

export interface DynamicTableComponentProps {
  items: DynamicObjectArray;
  // onEdit: (id: number) => void;
  onEdit: (id: number) => void;
  // onDelete: (id: number) => void;
  onDelete: (id: number) => void;
  showForm: boolean;
  handleToggleForm: () => void;
  tableName: string;
  formFieldsToExcludeInTable: string[];
}

export interface WithCrudProps {
  model: any;
  createViewEditTable?: React.FC<DynamicTableComponentProps>;
}

export interface FetchPayload {
  id: string;
  data: FieldValues;
}

export interface ApiResponse {
  error?: boolean;
  ok?: boolean;
  status?: number;
  statusText?: string;
  url?: string;
}

export interface GenericFormProps {
  model: any;
  onSubmit: (data: FieldValues) => void;
  // onSubmit: () => void;
  initialData?: FieldValues | null;
  handleToggleForm?: () => void;
}

export interface ModelFormData {
  id?: number;
  name: string;
  email: string;
  address: string;
  logo?: string[];
  active: boolean;
  paymentOptions: string;
  contacts: string;
  test1: boolean;
  daterange: string;
  daterange2: string;
}

export type FieldType = "hidden" | "text" | "number" | "multiline" | "radio" | "checkbox" | "select" | "imageupload" | "daterange" | "daterangev2";

export interface ValidateOptions {
  dbName: string; // form field name from DB col
  label: string;
  type: FieldType;
  required: boolean;
  pattern: { value: RegExp; message: string; type: FieldType } | null;
  options: { value: string; label: string }[] | null;
  enum: any | null; // For handling enums
  min: number | null;
  max: number | null;
  error: string | null;
  minLength?: number | null;
  maxLength?: number | null;
  // INFO:
  /* EXAMPLES:
      <input {...register("firstName", { required: true, maxLength: 20 })} />
      <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
      <input type="number" {...register("age", { min: 18, max: 99 })} />
      <input type="submit" />
    */
}

// TODO: Fix this type or delete
// export type ValidationType<T extends keyof ModelFormData> = Partial<{
//   [key in T]: ValidateOptions;
// }>;
// export type ValidationType = Partial<{
//   [key in keyof ModelFormData]: ValidateOptions;
// }>;

export type SortDirection = "asc" | "desc" | null;

export interface DynamicTableProps {
  data: Record<string, any>[];
  onRowSelect?: (id: any) => void;
  onAction: (id: any[]) => void;
  showForm: boolean;
  handleToggleForm: () => void;
}

export interface TableItem {
  id?: number | string | null;
  [key: string]: any;
}

// Define the interface for the props
export interface DateRangeSelectorV2Props {
  name: string; // Main name for the group (optional, but can be useful for grouping)
  label?: string; // Label text for the date range selector
  required?: boolean; // Whether both dates are required
  minDate?: Date; // Minimum allowed date
  maxDate?: Date; // Maximum allowed date
  excludedDates?: Date[]; // Array of dates to exclude
  minDaysSelected?: number; // Minimum number of days that must be selected
  error?: string; // External error message
  className?: string; // Additional class names for styling
  color?: string; // eg "#1427a6"
  excludeWeekends?: boolean; // Exclude weekends 4 weeks before, 12 weeks after
  // initialDates?: null | { startDate: string; endDate: string };
}

export interface TDateRangeV2 {
  startDate: Date | null;
  endDate: Date | null;
  key: string;
  color: string | undefined;
  autoFocus: boolean;
  disabled: boolean;
  showDateDisplay: boolean;
}
