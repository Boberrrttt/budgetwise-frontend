interface BudgetPlanPopupTypes {
    setIsPlusClicked: (value: boolean) => void 
}

const BudgetPlanPopup = ( { setIsPlusClicked }: BudgetPlanPopupTypes) =>{
    return (
        <div onClick={() => setIsPlusClicked(false)} className="w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 fixed top-0 left-0 z-20">
            <div onClick={e => e.stopPropagation()} className="bg-neutral-50 dark:bg-neutral-900 w-80 h-80 rounded-2xl flex flex-col gap-10 items-center justify-center">
                <div className="flex flex-col gap-1">
                    <label htmlFor="">Plan name</label>
                    <input type="text" className="rounded-lg border  px-3 py-2"  />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="">Allocated amount</label>
                    <input type="text" className="rounded-lg border  px-3 py-2"  />
                </div>

                <button className="bg-brandPrimary w-[70%] rounded-lg py-2 hover:opacity-85" >Enter</button>
            </div>
        </div>
    )
}

export default BudgetPlanPopup