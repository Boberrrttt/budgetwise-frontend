import { useRouter } from "next/navigation";
import { Progress } from "../ui/progress";

interface BudgetPlanTypes{
    budgetPlan: PlanTypes 
}

interface PlanTypes {
    id: number;
    name: string;
    allocatedAmount: number;
    spentAmount: number;
}

 const BudgetPlan = ( { budgetPlan } : BudgetPlanTypes) => {
    const router = useRouter();

    const progress = Math.round((budgetPlan.spentAmount / budgetPlan.allocatedAmount) * 100)
    
    return (
        <div className="flex gap-10 items-center hover:shadow-white hover:shadow-[0_2px_10px_rgba(255,255,255,0.2)] rounded-3xl py-6 px-8">
            
            <h1 className="text-4xl font-bold">{budgetPlan.name}</h1>
            <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                    <h1 className="text-xl">P {budgetPlan.spentAmount} / P {budgetPlan.allocatedAmount}</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => router.push('/edit-plan')} className="hover:cursor-pointer" width="24" height="24" viewBox="0 0 24 24">
                        <g className="edit-outline">
                            <g fill="currentColor" fillRule="evenodd" className="Vector" clipRule="evenodd">
                                <path d="M2 6.857A4.857 4.857 0 0 1 6.857 2H12a1 1 0 1 1 0 2H6.857A2.857 2.857 0 0 0 4 6.857v10.286A2.857 2.857 0 0 0 6.857 20h10.286A2.857 2.857 0 0 0 20 17.143V12a1 1 0 1 1 2 0v5.143A4.857 4.857 0 0 1 17.143 22H6.857A4.857 4.857 0 0 1 2 17.143z" />
                                <path d="m15.137 13.219l-2.205 1.33l-1.033-1.713l2.205-1.33l.003-.002a1.2 1.2 0 0 0 .232-.182l5.01-5.036a3 3 0 0 0 .145-.157c.331-.386.821-1.15.228-1.746c-.501-.504-1.219-.028-1.684.381a6 6 0 0 0-.36.345l-.034.034l-4.94 4.965a1.2 1.2 0 0 0-.27.41l-.824 2.073a.2.2 0 0 0 .29.245l1.032 1.713c-1.805 1.088-3.96-.74-3.18-2.698l.825-2.072a3.2 3.2 0 0 1 .71-1.081l4.939-4.966l.029-.029c.147-.15.641-.656 1.24-1.02c.327-.197.849-.458 1.494-.508c.74-.059 1.53.174 2.15.797a2.9 2.9 0 0 1 .845 1.75a3.15 3.15 0 0 1-.23 1.517c-.29.717-.774 1.244-.987 1.457l-5.01 5.036q-.28.281-.62.487m4.453-7.126s-.004.003-.013.006z" />
                            </g>
                        </g>
                    </svg>
                </div>
                {/* Progress Bar */}
                <Progress className="w-[20rem] h-4" value={progress}/>
            </div>
        </div>
    )
}

export default BudgetPlan