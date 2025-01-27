import axiosInstance from "@/utils/axiosinstance";
import { useLoading } from "@/utils/useLoading";
import { useState } from "react";

interface PopupTypes {
    planId: string,
    setIsPopup: (value: boolean) => void,
    fetchItems: () => void
}

const AddItemPopup = ({ setIsPopup, planId, fetchItems }: PopupTypes) => {
    const { loading, setLoading } = useLoading();
    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<string>('');

    const addItem = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true);

        await axiosInstance.post('/api/budgetPlan/addItem', {
            name: name,
            price: price,
            planId: planId
        })
        setIsPopup(false)
        fetchItems()
        setLoading(false)
    } 

  return (
    <div onClick={() => setIsPopup(false)} className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 bg-black bg-opacity-30">
        <form onSubmit={e => addItem(e)} onClick={e => e.stopPropagation()} className="w-80 h-80 bg-neutral-50 flex items-center gap-10 justify-center flex-col dark:bg-neutral-900 rounded-2xl">
            <div className="flex flex-col gap-1">
                <label htmlFor="">Item name</label>
                <input type="text" className="rounded-lg border px-3 py-2 bg-white text-black border-black" value={name} onChange={e => setName(e.target.value)}   />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="">Price</label>
                <input type="number" className="rounded-lg border px-3 py-2 bg-white text-black border-black" value={price} onChange={e => setPrice(e.target.value)} />
            </div>

            <button type="submit" className="bg-brandPrimary w-[70%] rounded-lg py-2 hover:opacity-85" >{loading? 'Adding item...' : 'Enter'}</button>
        </form>
    </div>
  );
};

export default AddItemPopup;