import { validationAuthContent } from "@/content/auth/validation.auth.content";

export const validateEmail = (email: string) => {
    if(!email.trim()) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) return "Enter a valid email.";
    return null;
}

export const validatePassword = (password: string) => {
    if(!password.trim()) return 'Password is required';
    if(password.length < 8) return "Password must be at least 8 characters long.";
    return null;
}

export const validateFields = (fields: Partial<Record<string, string>>, requiredFields: string[]) => {
    const errors: Record<string, string> = {};

    requiredFields.forEach( field => {
        if(!fields[field]?.trim()) errors[field] = `${validationAuthContent.fieldNames[field]} is required`;
    })

    return errors
}