import Link from "next/link"

/**
 * SignupPage
 * 
 * This component renders the signup page. It contains
 * a form with fields for firstname, lastname, email, password and
 * confirm password. It also contains a link to the login page.
 * 
 * @returns The SignupPage component
 */
const SignupPage = () => {
    return (
        <div className="w-screen gap-10 h-screen flex pt-4 overflow-auto flex-col items-center">
            
            {/* Header with logo and title */}
            <div className="flex gap-10 items-center">
                <h1 className="font-bold text-6xl text-brandLight">BudgetWise</h1>
                
                {/* Logo */}
                <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 48 48">
                    <path fill="#7CB9E8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="m24.437 11.219l-2.649-4.78l-13.092 8.456m26.321 0l-4.288-7.74l-11.984 7.74m16 13.675a2.047 2.047 0 1 1-2.045-2.047h0c1.13 0 2.045.916 2.045 2.047m-2.54 5.804c-3.23 0-5.831-2.568-5.831-5.757s2.6-5.756 5.832-5.756l9.127-.097c.648 0 1.168.52 1.168 1.166v9.18c0 .647-.52 1.167-1.167 1.167zm7.825-.085v4.238a3.026 3.026 0 0 1-3.019 3.034H8.532A3.026 3.026 0 0 1 5.5 38.543V17.927a3.026 3.026 0 0 1 3.02-3.033h28.477a3.026 3.026 0 0 1 3.033 3.02v4.864" />
                </svg>

            </div>

            {/* Form */}
            <div className="flex flex-col w-[35%]">
                <div className="flex gap-10">
                    <div className="flex flex-col w-1/2">
                        <label htmlFor="email" className="text-xl mb-2">Firstname</label>
                        <input type="text" className="px-3 py-2 border-2 rounded-xl border-black " />
                    </div>

                    <div className="flex flex-col w-1/2">
                        <label htmlFor="email" className="text-xl mb-2">Lastname</label>
                        <input type="text" className="px-3 py-2 border-2 rounded-xl border-black " />
                    </div>
                </div>

                
                <label htmlFor="email" className="text-xl mt-4 mb-2">Email</label>
                <input type="text" className="px-3 py-2 border-2 rounded-xl border-black " />

                <label htmlFor="email" className="text-xl mt-4 mb-2">Password</label>
                <input type="text" className="px-3 py-2 border-2 rounded-xl border-black " />
                
                <label htmlFor="email" className="text-xl mt-4 mb-2">Confirm Password</label>
                <input type="text" className="px-3 py-2 border-2 rounded-xl border-black " />

                <a href="#_" className="px-5 py-2 relative mt-12 border-2 border-black flex justify-center items-center  group overflow-hidden  text-black rounded-xl font-bold">
                    <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-brandLight group-hover:h-full opacity-90"></span>
                    <span className="relative group-hover:text-white text-xl">Login</span>
                </a>

                <span className="text-center mt-12">
                    Already Signed in? <br /> <Link href={"/auth/login"} className="underline hover:text-brandLight">Login here</Link>
                </span>
            </div>

        </div>
    )
}

export default SignupPage