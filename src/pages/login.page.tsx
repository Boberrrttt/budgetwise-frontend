
import ButtonAuth from "@/components/auth/button.auth"
import InputFieldAuth from "@/components/auth/inputfield.auth"
import Link from "next/link"
import { useState } from "react"
import NProgress from "nprogress"
import axiosInstance from "@/utils/axiosinstance"
import { useRouter } from "next/navigation"


interface LoginCredentialsProps {
    email: string,
    password: string
}

/**
 * LoginPage
 * 
 * This component renders the login page. It contains
 * a form with fields for email and password. It also contains
 * a link to the signup page.
 * 
 * @returns The LoginPage component
 */
const LoginPage = () => {
    const router = useRouter();

    const [loginCredentials, setLoginCredentials] = useState<LoginCredentialsProps>({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState<LoginCredentialsProps>({
        email: "",
        password: ""
    })

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        NProgress.start(); 
        try {
          const response = await axiosInstance.post("http://localhost:8000/api/login", {
            email: loginCredentials.email,
            password: loginCredentials.password,
          });
          
          if (response.status === 200) {
            setLoginCredentials({ email: "", password: "" });
            router.replace("/dashboard");
          }
        } catch (error) {
          console.error(`Error in login: ${error}`);
        } finally {
          NProgress.done();
        }
      };

    return (
        <div className="w-screen gap-10 h-screen flex justify-center overflow-auto flex-col items-center">
            {/* Header with logo and title */}
            <div className="flex gap-10 items-center">
                <h1 className="font-bold text-6xl text-brandLight">BudgetWise</h1>
                
                {/* Logo */}
                <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 48 48">
                    <path fill="#7CB9E8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="m24.437 11.219l-2.649-4.78l-13.092 8.456m26.321 0l-4.288-7.74l-11.984 7.74m16 13.675a2.047 2.047 0 1 1-2.045-2.047h0c1.13 0 2.045.916 2.045 2.047m-2.54 5.804c-3.23 0-5.831-2.568-5.831-5.757s2.6-5.756 5.832-5.756l9.127-.097c.648 0 1.168.52 1.168 1.166v9.18c0 .647-.52 1.167-1.167 1.167zm7.825-.085v4.238a3.026 3.026 0 0 1-3.019 3.034H8.532A3.026 3.026 0 0 1 5.5 38.543V17.927a3.026 3.026 0 0 1 3.02-3.033h28.477a3.026 3.026 0 0 1 3.033 3.02v4.864" />
                </svg>
            </div>

            {/* Form */}
            <form className="flex flex-col w-[25%]" onSubmit={e => handleLogin(e)}>
                <InputFieldAuth label={"Email"} onChange={e => setLoginCredentials({...loginCredentials, email: e.target.value})} value={loginCredentials.email} error={errors.email}/>

                <InputFieldAuth label={"Password"} margin={"mt-8"} onChange={e => setLoginCredentials({...loginCredentials, password: e.target.value})} value={loginCredentials.password} error={errors.password}/>

                <ButtonAuth buttonLabel={"Login"}/>

                <span className="text-center mt-12">
                    No account yet? <br /> <Link href={"/signup"} className="underline hover:text-brandLight">Sign up here</Link>
                </span>
            </form>

        </div>
    )
}


export default LoginPage