import Nav from "@/components/navigation/nav";
import GroupChat from "@/components/group-plan/groupchat";
import BudgetPlan from "@/components/group-plan/budgetplan";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosinstance";
import { useLoading } from "@/utils/useLoading";
import { CircularProgress } from "@mui/material";
import BudgetPlanPopup from "@/components/group-plan/budgetplan.popup";

interface BudgetPlanTypes {
    id: number;
    name: string;
    allocatedAmount: number;
    spentAmount: number;
    groupId: number;
}

const GroupPlanPage = () => {
    const { loading, setLoading } = useLoading();

    const searchParams = useSearchParams();
    const { groupName, groupId } = Object.fromEntries(searchParams!);
    
    const [budgetPlans, setBudgetPlans] = useState<BudgetPlanTypes[]>([])
    const [isHovered, setIsHovered] = useState(false);
    const [isPlusClicked, setIsPlusClicked] = useState(false);
    
    useEffect(() =>{
        const fetchBudgetPlans = async () =>{
            setLoading(true);
            try {
                const response = await axiosInstance.get(`/api/getBudgetPlan?groupId=${groupId}`);
                const budgetPlanData = response.data.budgetPlans.map((plan: any) => ({
                  id: plan.id,
                  name: plan.name,
                  allocatedAmount: plan.allocated_amount,
                  spentAmount: plan.spent_amount
                }));
                setBudgetPlans([...budgetPlanData, { id: -1, name: 'plus-button' }]);
                setLoading(false);
              } catch (error) {
                console.error('Failed to retrieve budget plans', error);
                setLoading(false);
              }
        }
        fetchBudgetPlans();       
    }, [])

    return (
        <div className="flex flex-col w-screen h-screen">
            <Nav groupname={groupName!}/>
            
            <div className="flex w-full h-full overflow-hidden">
                <div className="overflow-y-auto flex-grow items-center flex gap-20 flex-col py-12 pl-20">
                    {loading ? (
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">    
                            <CircularProgress/>
                        </div>
                    ) : (
                        budgetPlans.map((plan, idx) => (
                            <div key={idx}>
                              {plan.name === 'plus-button' ? (
                                <button onClick={() => setIsPlusClicked(true)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="w-full h-full flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24">
                                    <path fill={`${isHovered ? '#3366B3' : 'currentColor'}`} d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
                                  </svg>
                                </button>
                              ) : (
                                <BudgetPlan budgetPlan={budgetPlans[idx]} groupName={groupName}/>
                              )}
                            </div>
                          ))
                    )}
                </div>

                { isPlusClicked && <BudgetPlanPopup setIsPlusClicked={setIsPlusClicked} groupId={groupId!}/>}
                
                <div className="w-1/4">
                    <GroupChat />
                </div>
            </div>
        </div>
    );
};

export default GroupPlanPage;