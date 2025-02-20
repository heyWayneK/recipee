"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { type CustomerFormData, customerValidationRules } from "@/app/recipee/formgen/_formSchemas/customerSchema";
import { useCustomerCrud } from "../hooks/useCustomerCrud";

interface CustomerFormProps {
  initialData?: CustomerFormData;
  onSuccess: () => void;
}

import React, { ReactNode, useEffect } from "react";

export const CustomerForm: React.FC<CustomerFormProps> = ({ initialData, onSuccess }) => {
  console.log("INITIAL DATA:::::::::::", initialData);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormData>({
    //   } = useForm({
    defaultValues: initialData || {
      name: "--",
      email: "",
      address: "",
      logo: "",
      active: true,
      paymentOptions: "",
      contacts: "",
    },
  });

  useEffect(() => {
    console.log("Initial Data, has changed", initialData);
    if (initialData) reset(initialData);
  }, [initialData]);

  const { createCustomer, updateCustomer, isLoading, error } = useCustomerCrud();

  const onSubmit: SubmitHandler<CustomerFormData> = async (data) => {
    if (initialData) {
      await updateCustomer(initialData.id!, data);
    } else {
      await createCustomer(data);
    }
    onSuccess();
    reset({
      name: "--",
      email: "",
      address: "",
      logo: "",
      active: true,
      paymentOptions: "",
      contacts: "",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name", customerValidationRules.name)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email", customerValidationRules.email)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          type="text"
          id="address"
          {...register("address", customerValidationRules.address)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
      </div>

      <div>
        <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
          Logo URL
        </label>
        <input
          type="text"
          id="logo"
          {...register("logo")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label htmlFor="active" className="flex items-center">
          <input
            type="checkbox"
            id="active"
            {...register("active")}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <span className="ml-2 text-sm text-gray-700">Active</span>
        </label>
      </div>

      <div>
        <label htmlFor="paymentOptions" className="block text-sm font-medium text-gray-700">
          Payment Options
        </label>
        <input
          type="text"
          id="paymentOptions"
          {...register("paymentOptions", customerValidationRules.paymentOptions)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.paymentOptions && <p className="mt-1 text-sm text-red-600">{errors.paymentOptions.message}</p>}
      </div>

      <div>
        <label htmlFor="contacts" className="block text-sm font-medium text-gray-700">
          Contacts
        </label>
        <input
          type="text"
          id="contacts"
          {...register("contacts", customerValidationRules.contacts)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.contacts && <p className="mt-1 text-sm text-red-600">{errors.contacts.message}</p>}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {isLoading ? (initialData ? "Updating..." : "Saving...") : initialData ? "Update" : "Save"}
      </button>
    </form>
  );
};
