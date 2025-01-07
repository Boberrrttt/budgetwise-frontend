import { useState } from "react";
import { validationAuthContent } from "@/content/auth/validation.auth.content";


interface ValidationErrorProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const useValidation = () => {
  const [errors, setErrors] = useState<ValidationErrorProps>({email: "", password: ""});

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
    const newErrors: ValidationErrorProps = { email: "", password: "" };

    requiredFields.forEach((field) => {
      if (!fields[field]?.trim()) {
        (newErrors as unknown as Record<string, string>)[field] = `${validationAuthContent.fieldNames[field]} is required`;
      }
    });

    setErrors(newErrors);
    return newErrors;
  };

  return {
    errors,
    setErrors,
    validateEmail,
    validatePassword,
    validateFields,
  };
};

export default useValidation;