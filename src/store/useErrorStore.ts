import { error } from "console";
import { create } from "zustand";

interface ErrorTypes {
    error: string | null;
    setError: (error: string) => void; 
    clearError: () => void  
}

const useErrorStore = create<ErrorTypes>((set) => ({
    error: null,
    setError: (error) => set({error: error}),
    clearError: () => set({error: null})
}))

export default useErrorStore