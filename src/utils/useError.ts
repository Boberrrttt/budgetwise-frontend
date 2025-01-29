import { useState } from "react";

export const useError = () => {
    const [error, setError] = useState(null);
    
    const handleError = (error: any) => {
        setError(error);
    };

    const clearError = () => {
        setError(null);
    }

    return { error, setError, handleError, clearError }
}