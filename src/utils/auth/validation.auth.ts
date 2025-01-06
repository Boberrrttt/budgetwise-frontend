import { useState } from "react";
import { validationAuthContent } from "@/content/auth/validation.auth.content";

const useValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    if (!email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Enter a valid email.";
    return null;
  };

  const validatePassword = (password: string) => {
    if (!password.trim()) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters long.";
    return null;
  };

  const validateFields = (fields: Partial<Record<string, string>>, requiredFields: string[]) => {
    const newErrors: Record<string, string> = {};

    requiredFields.forEach((field) => {
      if (!fields[field]?.trim()) {
        newErrors[field] = `${validationAuthContent.fieldNames[field]} is required`;
      }
    });

    setErrors(newErrors);
    return newErrors;
  };

  return {
    errors,
    validateEmail,
    validatePassword,
    validateFields,
  };
};

export default useValidation;