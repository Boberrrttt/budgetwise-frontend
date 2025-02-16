import useErrorStore from "@/store/useErrorStore";
import useLoadingStore from "@/store/useLoadingStore";
import useWebSocketStore from "@/store/useWebSocketStore";
import axiosInstance from "@/utils/axiosinstance";
import React, { useEffect, useState } from "react";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

interface BudgetPlanPopupTypes {
    setIsPlusClicked: (value: boolean) => void;
    groupId: string;
}

const BudgetPlanPopup = ({ setIsPlusClicked, groupId }: BudgetPlanPopupTypes) => {
    const loading = useLoadingStore((state) => state.loading);
    const setLoading = useLoadingStore((state) => state.setLoading);

    const error = useErrorStore((state) => state.error);
    const setError = useErrorStore((state) => state.setError);
    const clearError = useErrorStore((state) => state.clearError);

    const [name, setName] = useState<string>("");
    const [amount, setAmount] = useState<string>("");

    // const { socket, connect, disconnect } = useWebSocketStore();


    const createNewPlan = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axiosInstance.post("/api/budgetPlan/createBudgetPlan", {
                name: name,
                allocatedAmount: amount,
                groupId: groupId,
            });

            setLoading(false);
            clearError();
            setIsPlusClicked(false);

            
        } catch (error) {
            setLoading(false);
            setError("All fields required");
        }
    };

    return (
        <div
            onClick={() => {
                setIsPlusClicked(false);
                clearError();
            }}
            className="w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 fixed top-0 left-0 z-20"
        >
            <form
                // onSubmit={createNewPlan}
                onClick={(e) => e.stopPropagation()}
                className="bg-neutral-50 dark:bg-neutral-900 w-80 rounded-2xl flex flex-col gap-10 items-center py-7"
            >
                <div className="flex flex-col gap-1">
                    <label htmlFor="name">Plan name</label>
                    <input
                        id="name"
                        type="text"
                        className="rounded-lg border px-3 py-2 bg-white text-black border-black"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="amount">Allocated amount</label>
                    <input
                        id="amount"
                        type="number"
                        className="rounded-lg border px-3 py-2 bg-white text-black border-black"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-brandPrimary w-[70%] rounded-lg py-2 hover:opacity-85"
                >
                    {loading ? "Creating plan..." : "Create"}
                </button>

                {error !== null && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    );
};

export default BudgetPlanPopup;