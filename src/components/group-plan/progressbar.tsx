import { useEffect } from "react";

interface ProgressBarType {
    currentAmount: number;
    totalAmount: number;
}

const ProgressBar = ({ currentAmount, totalAmount }: ProgressBarType) => {
    const progress = (currentAmount / totalAmount) * 100;
    
    return (
        
        <div className="w-[20rem] h-[2rem] bg-white border border-black">
            <div className={`bg-blue-700 w-[${progress}%] h-full `}></div>
        </div>
    )
}

export default ProgressBar