
interface ButtonAuthProps { 
    buttonLabel: string,
}

const ButtonAuth = ({ buttonLabel }: ButtonAuthProps) => {

    return (
        <button className="px-5 py-2 hover:cursor-pointer relative mt-16 border-2 border-black dark:border-white flex justify-center items-center  group overflow-hidden  text-black rounded-xl font-bold">
            <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-brandLight group-hover:h-full opacity-90"></span>
            <span className="relative group-hover:text-white dark:text-white text-xl">{buttonLabel}</span>
        </button>
    )
}

export default ButtonAuth