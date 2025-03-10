import useBudgetStore from "@/store/useBudgetStore";
import { Progress } from "../ui/progress";
import Link from "next/link";

interface BudgetPlanTypes{
    budgetPlan: PlanTypes,
}

interface PlanTypes {
    id: number;
    name: string;
    allocatedAmount: number;
    spentAmount: number;
}

 const BudgetPlan = ( { budgetPlan } : BudgetPlanTypes) => {
    const progress = Math.round((budgetPlan.spentAmount / budgetPlan.allocatedAmount) * 100)
    const setBudgetPlan = useBudgetStore((state) => state.setBudgetPlan)
    
    return (
        <Link href={'/edit-plan'} onClick={() => setBudgetPlan(budgetPlan)} className="flex gap-10 items-center w-full justify-between hover:shadow-[0_2px_10px_rgba(0,0,0,0.7)] hover:dark:shadow-[0_2px_10px_rgba(255,255,255,0.7)]  rounded-3xl py-6 px-8">
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