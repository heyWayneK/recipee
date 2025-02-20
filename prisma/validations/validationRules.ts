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
  age: {
    required: "Age is required",
    min: { value: 18, message: "Must be at least 18 years old" },
    max: { value: 120, message: "Must be at most 120 years old" },
  },
  bio: {
    maxLength: { value: 500, message: "Bio must be less than 500 characters" },
  },
  isActive: {
    required: "Please specify if the customer is active",
  },
  preferredContact: {
    required: "Please select a preferred contact method",
  },
  type: {
    required: "Please select a customer type",
  },
};
