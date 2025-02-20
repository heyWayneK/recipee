"use client";
import React, { Suspense, useEffect } from "react";
import { FormProvider, useForm, type FieldValues } from "react-hook-form";
import { generateFormFields } from "@/app/recipee/formgen/_util/FormGen_FormElements";
import { Button } from "@/components/ui/button";
import Pill from "@/components/Pill";
import Loading from "@/components/Loading";
import { GenericFormProps } from "../_types/formGen_types";

export function DynamicFormComponent({ model, onSubmit, initialData, handleToggleForm }: GenericFormProps) {
  const methods = useForm<FieldValues>({
    defaultValues: initialData,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
    reset,
  } = methods;

  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  const errorsCount = Object.keys(errors).length ?? 0;

  if (isLoading) return <Loading />;

  return (
    // <Suspense fallback={<Loading />}>
    <FormProvider key={"formProvider"} {...methods}>
      <form key={"crud_form"} onSubmit={handleSubmit(onSubmit)} className="space-y-4  w-svw max-w-[900px] pr-16">
        {/* CREATE ALL FORM FIELDS DYNAMICALLY */}
        {generateFormFields(model, register)}

        {/* FORM ERRORS */}
        <div key={"form_errors_div"} className="flex gap-2  flex-wrap justify-start">
          {Object.keys(errors).map((field, i) => (
            // ERRORS LIST
            <Pill key={`${field}-${i}-error`} className="[&>svg]:fill-yellow-400 bg-red-500 text-white fill-yellow-400 border-none" iconName="warning">
              {errors[field]?.message as string}
            </Pill>
          ))}
        </div>

        <div key={`action-buttons`} className="grid gap-2 grid-flow-col">
          {/* disabled={errorsCount > 0 ? true : false}  className={`${errorsCount > 0 ? " line-through" : ""}`*/}

          <Button key={"submitButton"} disabled={isSubmitting} variant={`${errorsCount > 0 ? "destructive" : "secondary"}`} type="submit">
            {initialData ? (errorsCount > 0 ? `Save Update - Fix ${errorsCount} Errors` : "Save Update") : errorsCount > 0 ? `Save New - Fix ${errorsCount} Errors` : "Save New"}
          </Button>

          <Button key={"CancelButton"} variant="secondary" type="button" onClick={handleToggleForm}>
            {initialData ? "Cancel Update" : "Cancel New"}
          </Button>
        </div>
      </form>
    </FormProvider>
    // </Suspense>
  );
}
