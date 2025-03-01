import React from "react";
// import type { FieldValues, UseFormRegister } from "react-hook-form";
import Input from "../_components/_ui/Input";
import Textarea from "../_components/_ui/Textarea";
import RadioButtonGroup from "../_components/_ui/RadioGroup";
import Select from "../_components/_ui/Select";

import MultiCheckbox from "../_components/_ui/CheckBoxGroup";
import ImageUpload from "../_components/_ui/Imageupload";
import DateRangeSelector from "../_components/_ui/DateRangeSimpleV1";
import DateRangeSelectorV2 from "../_components/_ui/DateRangeSelectorV2";
import { ValidateOptions } from "../_types/formGen_types";
import Hidden from "../_components/_ui/Hidden";

// export function generateFormFields(model: ValidateOptions[], register: UseFormRegister<FieldValues>) {
export function generateFormFields(model: Required<ValidateOptions>[]) {
  // FLATTEN OBJECT INTO ARRAY WITH ID FIRST
  const formArray: Required<ValidateOptions>[] = Object.entries(model).reduce((acc: Required<ValidateOptions>[], [key, value]) => {
    acc.push({ ...value, name: key });
    return acc;
  }, []);
  let inputElement;
  return formArray.map((option: Required<ValidateOptions>, i) => {
    switch (option.type) {
      case "hidden":
        // inputElement = <Hidden name={option.name} options={option.options} required={option.required} {...option} placeholder={option.type} />;
        inputElement = <Hidden name={option.name!} placeholder={option.type} />;
        break;
      case "text":
      case "number":
        inputElement = <Input name={option.name!} label={option.label} required={option.required} placeholder={option.type} />;
        break;
      case "multiline":
        inputElement = <Textarea name={option.name!} rows={3} label={option.label} required={option.required} placeholder={option.type} />;
        break;
      case "radio":
        inputElement = <RadioButtonGroup name={option.name!} label={option.label} options={option.options} required={option.required} />;
        break;
      case "checkbox":
        inputElement = <MultiCheckbox name={option.name!} label={option.label} options={option.options} required={option.required} />;
        break;
      case "select":
        inputElement = <Select name={option.name!} label={option.label} options={option.options} selectMultiple={false} required={option.required} />;
        break;
      case "imageupload":
        inputElement = <ImageUpload name={option.name!} label={option.label} required={option.required} accept="image/*" />;
        break;
      case "daterange":
        // INFO: Remember months are zero indexed
        inputElement = <DateRangeSelector name={option.name!} label={option.label} required={option.required} />;
        // INFO:
        // <DateRangeSelector
        //   name={option.name}
        //   label={option.name}
        //   required={true}
        //   nameStart={"Start"}
        //   nameEnd={"End"}
        //   minDate={"2025-01-02"}
        //   maxDate={"2025-03-23"}
        //   // errorStart={"Start Date needed"}
        //   // errorEnd={"End Date Needed"}
        // />

        break;
      case "daterangev2":
        // INFO: Remember months are zero indexed
        inputElement = (
          <DateRangeSelectorV2
            name={option.name!}
            label={option.label}
            required={option.required}
            minDaysSelected={1} // use 1 as default
            excludedDates={[]}
            excludeWeekends={false}
            // initialDates={{ startDate: "2023-10-15", endDate: "2023-10-18" }}
          />
        );
        // INFO: excludedDates={[new Date("2023-10-10"), new Date("2023-10-15"), new Date("2023-10-20")]}
        break;
      default:
        inputElement = <Input name={option.name!} label={option.label} required={option.required} placeholder={`${option.type} default`} />;
    }

    if (option.type === "hidden") return <a key={i}>{inputElement}</a>;
    return (
      <div key={i} className="mb-4">
        {inputElement}
      </div>
    );
  });
}
