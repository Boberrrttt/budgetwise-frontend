import useErrorStore from "@/store/useErrorStore";
import useLoadingStore from "@/store/useLoadingStore";
import axiosInstance from "@/utils/axiosinstance";
import { useState } from "react";

interface PopupTypes {
    planId: string,
    setIsPopup: (value: boolean) => void,
    fetchItems: () => void
}

const AddItemPopup = ({ setIsPopup, planId, fetchItems }: PopupTypes) => {
    
    const loading = useLoadingStore((state) => state.loading);
    const setLoading = useLoadingStore((state) => state.setLoading);
    
    const error = useErrorStore((state) => state.error);
    const setError = useErrorStore((state) => state.setError);
    const clearError = useErrorStore((state) => state.clearError);
    
    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<string>('');

    const addItem = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true);
            await axiosInstance.post('/api/budgetPlan/addItem', {
                name: name,
                price: price,
                planId: planId
            })
            setIsPopup(false)
            fetchItems()
            clearError()
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError('All fields required')
        }
    } 

  return (
    <div onClick={() => setIsPopup(false)} className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 bg-black bg-opacity-30">
        <form onSubmit={e => addItem(e)} onClick={e => e.stopPropagation()} className="w-80 bg-neutral-50 flex items-center gap-10 py-7 justify-center flex-col dark:bg-neutral-900 rounded-2xl">
            <div className="flex flex-col gap-1">
                <label htmlFor="">Item name</label>
                <input type="text" className="rounded-lg border px-3 py-2 bg-white text-black border-black" value={name} onChange={e => setName(e.target.value)}   />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="">Price</label>
                <input type="number" className="rounded-lg border px-3 py-2 bg-white text-black border-black" value={price} onChange={e => setPrice(e.target.value)} />
            </div>

            <button type="submit" className="bg-brandPrimary w-[70%] rounded-lg py-2 hover:opacity-85" >{loading? 'Adding item...' : 'Add'}</button>
            
            { error !== null && <p className="text-red-500">{error}</p>}
        </form>
    </div>
  );
};

export default AddItemPopup;