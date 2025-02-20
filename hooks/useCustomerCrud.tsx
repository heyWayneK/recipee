import { useState } from "react";
import type { CustomerFormData } from "@/app/recipee/formgen/_formSchemas/customerSchema";

export function useCustomerCrud() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCustomer = async (data: CustomerFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create customer");
      return await response.json();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCustomer = async (id: number, data: CustomerFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log("UPDATE:_____________", response);
      if (!response.ok) throw new Error("Failed to update customer");
      return await response.json();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCustomer = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete customer");
      return await response.json();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { createCustomer, updateCustomer, deleteCustomer, isLoading, error };
}
