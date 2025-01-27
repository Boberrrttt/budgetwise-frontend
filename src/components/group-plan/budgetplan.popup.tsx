import axiosInstance from "@/utils/axiosinstance"
import React, { useState } from "react"

interface BudgetPlanPopupTypes {
    setIsPlusClicked: (value: boolean) => void ,
    groupId: string
}

const BudgetPlanPopup = ( { setIsPlusClicked, groupId }: BudgetPlanPopupTypes) =>{
    const [name, setName] = useState<string>('')
    const [amount, setAmount] = useState<string>('');

    const createNewPlan = async (e: React.FormEvent) => {
        e.preventDefault()
        await axiosInstance.post('/api/budgetPlan/createBudgetPlan', {
            name: name,
            allocatedAmount: amount,
            groupId: groupId
        });
        setIsPlusClicked(false) 
        window.location.reload();    
    } 

    return (
        <div onClick={() => setIsPlusClicked(false)} className="w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 fixed top-0 left-0 z-20">
            <form onSubmit={e => createNewPlan(e)} onClick={e => e.stopPropagation()} className="bg-neutral-50 dark:bg-neutral-900 w-80 h-80 rounded-2xl flex flex-col gap-10 items-center justify-center">
                <div className="flex flex-col gap-1">
                    <label htmlFor="">Plan name</label>
                    <input type="text" className="rounded-lg border px-3 py-2 bg-white text-black border-black" value={name} onChange={e => setName(e.target.value)}  />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="">Allocated amount</label>
                    <input type="number" className="rounded-lg border px-3 py-2 bg-white text-black border-black" value={amount} onChange={e => setAmount(e.target.value)} />
                </div>

                <button type="submit" className="bg-brandPrimary w-[70%] rounded-lg py-2 hover:opacity-85" >Enter</button>
            </form>
        </div>
    )
}

export default BudgetPlanPopup