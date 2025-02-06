import Nav from "@/components/navigation/nav";
import GroupChat from "@/components/group-plan/groupchat";
import BudgetPlan from "@/components/group-plan/budgetplan";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosinstance";
import { CircularProgress } from "@mui/material";
import BudgetPlanPopup from "@/components/group-plan/budgetplan.popup";
import useBudgetStore from "@/store/useBudgetStore";
import useLoadingStore from "@/store/useLoadingStore";

interface BudgetPlanTypes {
    id: number;
    name: string;
    allocatedAmount: number;
    spentAmount: number;
    groupId: number;
}

const GroupPlanPage = () => {
    const loading = useLoadingStore((state) => state.loading);
    const setLoading = useLoadingStore((state) => state.setLoading);

    const groupId = useBudgetStore((state) => state.groupId);
    const groupName = useBudgetStore((state) => state.groupName);

    const [budgetPlans, setBudgetPlans] = useState<BudgetPlanTypes[]>([]);
    const [isHovered, setIsHovered] = useState(false);
    const [isPlusClicked, setIsPlusClicked] = useState(false);

    useEffect(() => {
        const fetchBudgetPlans = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(`/api/budgetPlan/getBudgetPlan?groupId=${groupId}`);
                const budgetPlanData = response.data.budgetPlans.map((plan: any) => ({
                    id: plan.id,
                    name: plan.name,
                    allocatedAmount: plan.allocated_amount,
                    spentAmount: plan.spent_amount,
                }));
                setBudgetPlans([...budgetPlanData, { id: -1, name: "plus-button", allocatedAmount: 0, spentAmount: 0, groupId }]);
            } catch (error) {
                console.error("Failed to retrieve budget plans", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBudgetPlans();
    }, []);

    return (
        <div className="flex flex-col w-screen h-screen">
            <Nav groupname={groupName || ""} /> {/* ✅ Prevent undefined */}
            
            <div className="flex w-full h-full overflow-hidden">
                <div className="overflow-y-auto flex-grow items-center flex gap-20 flex-col py-12 pl-20">
                    {loading ? (
                        <div>
                            <CircularProgress />
                        </div>
                    ) : (
                        budgetPlans.map((plan, idx) => (
                            <div key={idx} className="w-[70%]">
                                {plan.name === "plus-button" ? (
                                    <button
                                        onClick={() => setIsPlusClicked(true)}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        className="w-full h-full flex items-center justify-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24">
                                            <path
                                                fill={isHovered ? "#3366B3" : "currentColor"}
                                                d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"
                                            />
                                        </svg>
                                    </button>
                                ) : (
                                    <BudgetPlan budgetPlan={budgetPlans[idx]}/>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {isPlusClicked && <BudgetPlanPopup setIsPlusClicked={setIsPlusClicked} groupId={groupId!.toString()} />}

                <div className="w-1/4">
                    <GroupChat />
                </div>
            </div>
        </div>
    );
};

export default GroupPlanPage;
