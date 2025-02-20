import { FieldValues } from "react-hook-form";
import { ApiResponse } from "../_types/formGen_types";

// CREATE NEW ROW
export const create_api = async (data: ApiResponse): Promise<ApiResponse> => {
  const response = await fetch("/api/customers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  alert(`CREATE API CALLED DATA: , ${data}`);
  // alert(`CREATE API CALLED: , ${response.json()}`);
  console.log(`CREATE API CALLED DATA: , ${data}`);
  return response.json();
};

// UPDATE
export const update_api = async (id: string, data: FieldValues) => {
  const response = await fetch(`/api/customers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

// DELETE
export const delete_api = async (id: string) => {
  const response = await fetch(`/api/customers/${id}`, { method: "DELETE" });
  return response.json();
};

// GET ONE
export const getOne_api = async (id: string) => {
  const response = await fetch(`/api/customers/${id}`);
  return response.json();
};

// GET ALL
export const getAll_api = async (): Promise<Response> => {
  const response: Response = await fetch("/api/customers");
  // await createPromiseDelay();
  if (!response.ok) {
    console.error(`Error - Check Internet Connection: ${response.status} ${response.statusText}`);
  }
  return response;
};
