import { Progress } from "../ui/progress";
import Link from "next/link";

interface BudgetPlanTypes{
    budgetPlan: PlanTypes,
    groupName: string 
}

interface PlanTypes {
    id: number;
    name: string;
    allocatedAmount: number;
    spentAmount: number;
}

 const BudgetPlan = ( { budgetPlan, groupName } : BudgetPlanTypes) => {
    const progress = Math.round((budgetPlan.spentAmount / budgetPlan.allocatedAmount) * 100)
    
    return (
        <Link href={{ pathname: '/edit-plan', query: {groupName: groupName, plan: JSON.stringify(budgetPlan)}}} className="flex gap-10 items-center w-full justify-between hover:shadow-white hover:shadow-[0_2px_10px_rgba(255,255,255,0.2)] rounded-3xl py-6 px-8">
            <h1 className="text-4xl font-bold">{budgetPlan.name}</h1>
            <div className="flex flex-col gap-3">
                <h1 className="text-xl">P {budgetPlan.spentAmount} / P {budgetPlan.allocatedAmount}</h1>
                {/* Progress Bar */}
                <Progress className="w-[20rem] h-4" value={progress}/>
            </div>
        </Link>
    )
}

export default BudgetPlan