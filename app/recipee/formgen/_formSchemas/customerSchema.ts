// TODO: MIGHT KEEP DUPLICATED DATA - might use

// FUTURE: Should be able to delete this file

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

/* 


export interface FieldConfig {
  type: FieldType;
  label: string;
  options?: string[] | { value: string; label: string }[];
  enum?: any; // For handling enums
}

type ValidationRules = {
  [key: string]: {
    required?: string;
    pattern?: {
      value: RegExp;
      message: string;
    };
    min?: number;
    max?: number;
    // Add other validation rules as needed
  };
};


*/
