
interface ProgressBarType {
    currentAmount: number;
    totalAmount: number;
}

const ProgressBar = ({ currentAmount, totalAmount }: ProgressBarType) => {
    const progress = (currentAmount / totalAmount) * 100;
    
}

export default ProgressBar