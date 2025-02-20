export interface CustomerFormData {
  id?: number;
  name: string;
  email: string;
  address: string;
  logo?: string;
  active: boolean;
  paymentOptions: string;
  contacts: string;
}

export const customerValidationRules = {
  name: {
    required: "Name is required",
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: "Invalid email address",
    },
  },
  address: {
    required: "Address is required",
  },
  paymentOptions: {
    required: "Payment options are required",
  },
  contacts: {
    required: "Contacts are required",
  },
};
