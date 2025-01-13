
import Nav from "@/components/navigation/nav";
import GroupChat from "@/components/group-plan/groupchat";
import BudgetPlan from "@/components/group-plan/budgetplan";

const GroupPlanPage = () => {
    return (
        <div className="flex flex-col w-screen h-screen">
            <Nav/>

            <BudgetPlan/>
            {/* <GroupChat/> */}
            
        </div>
    )
}

export default GroupPlanPage 