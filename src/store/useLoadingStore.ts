import { create } from "zustand";

interface LoadingTypes {
    loading: boolean,
    setLoading: (loading: boolean) => void
}

const useLoadingStore = create<LoadingTypes>((set) => ({
    loading: false,
    setLoading: (loading) => set({loading: loading})
}))

export default useLoadingStore