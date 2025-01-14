import Nav from "@/components/navigation/nav";
import GroupChat from "@/components/group-plan/groupchat";
import BudgetPlan from "@/components/group-plan/budgetplan";
import { useSearchParams } from "next/navigation";

const GroupPlanPage = () => {
    const searchParams = useSearchParams();
    const groupName = searchParams!.get('groupName');
    return (
        <div className="flex flex-col w-screen h-screen">
            <Nav groupname={groupName!}/>

            <div className="flex w-full h-full overflow-hidden">
                <div className="overflow-y-auto flex-grow items-center flex gap-20 flex-col py-12 pl-20">
                    <BudgetPlan />
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
                        </svg>
                    </button>
                </div>
                <div className="w-1/4">
                    <GroupChat />
                </div>
            </div>
        </div>
    );
};

export default GroupPlanPage;