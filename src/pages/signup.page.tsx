import ButtonAuth from "@/components/auth/button.auth"
import InputFieldAuth from "@/components/auth/inputfield.auth"
import ToggleThemeButton from "@/components/theme/button.toggletheme"
import { validateFields } from "@/utils/auth/validation.auth"
import axiosInstance from "@/utils/axiosinstance"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { useEffect, useState } from "react"

interface SignupCredentialsProps {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
}


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
    const router = useRouter();
    const [signupCredentials, setSignupCredentials] = useState<SignupCredentialsProps>(
        {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    )

    const [errors, setErrors] = useState<SignupCredentialsProps>(
        {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    )

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()

        const validationErrors = validateFields(
            {
                firstName: signupCredentials.firstName,
                lastName: signupCredentials.lastName,
                email: signupCredentials.email,
                password: signupCredentials.password,
                confirmPassword: signupCredentials.confirmPassword
            },
            ["firstName", "lastName", "email", "password", "confirmPassword"]
        );

        if(signupCredentials.password !== signupCredentials.confirmPassword) validationErrors.confirmPassword = "Passwords do not match";

        setErrors({
            firstName: validationErrors.firstName || "",
            lastName: validationErrors.lastName || "",
            email: validationErrors.email || "",
            password: validationErrors.password || "",
            confirmPassword: validationErrors.confirmPassword || ""
        })

        if(Object.keys(validationErrors).length === 0) {
            try {
                const response = await axiosInstance.post('http://localhost:8000/api/register', {
                    name: `${signupCredentials.firstName} ${signupCredentials.lastName}`,
                    email: signupCredentials.email,
                    password: signupCredentials.password
                });

                if(response.status === 200) {
                    setSignupCredentials({
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",
                        confirmPassword: ""
                    })
                    router.replace("/home")
                }
            } catch (error) {
                console.log(error);
            }
        }

    }

    return ( 
        <div className="w-screen gap-10 h-screen flex pt-4 overflow-auto flex-col items-center">
            <ToggleThemeButton isAuthenticated={false}/>
            {/* Header with logo and title */}
            <div className="flex gap-10 items-center">
                <h1 className="font-bold text-6xl text-brandLight">BudgetWise</h1>
                
                {/* Logo */}
                <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 48 48">
                    <path fill="#7CB9E8" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="m24.437 11.219l-2.649-4.78l-13.092 8.456m26.321 0l-4.288-7.74l-11.984 7.74m16 13.675a2.047 2.047 0 1 1-2.045-2.047h0c1.13 0 2.045.916 2.045 2.047m-2.54 5.804c-3.23 0-5.831-2.568-5.831-5.757s2.6-5.756 5.832-5.756l9.127-.097c.648 0 1.168.52 1.168 1.166v9.18c0 .647-.52 1.167-1.167 1.167zm7.825-.085v4.238a3.026 3.026 0 0 1-3.019 3.034H8.532A3.026 3.026 0 0 1 5.5 38.543V17.927a3.026 3.026 0 0 1 3.02-3.033h28.477a3.026 3.026 0 0 1 3.033 3.02v4.864" />
                </svg>

            </div>

            {/* Form */}
            <form className="flex flex-col w-[35%]" onSubmit={e => handleSignup(e)}>
                <div className="flex gap-10">
                    <div className="flex flex-col w-1/2">
                        <InputFieldAuth label={"Firstname"} onChange={e => setSignupCredentials({...signupCredentials, firstName: e.target.value})} value={signupCredentials.firstName} error={errors.firstName}/>
                    </div>

                    <div className="flex flex-col w-1/2">
                        <InputFieldAuth label={"Lastname"} onChange={e => setSignupCredentials({...signupCredentials, lastName: e.target.value})} value={signupCredentials.lastName} error={errors.lastName}/>
                    </div>
                </div>

                <InputFieldAuth label={"Email"} margin={"mt-4"} onChange={e => setSignupCredentials({...signupCredentials, email: e.target.value})} value={signupCredentials.email} error={errors.email}/>
                <InputFieldAuth label={"Password"} margin={"mt-4"} onChange={e => setSignupCredentials({...signupCredentials, password: e.target.value})} value={signupCredentials.password} error={errors.password}/>
                <InputFieldAuth label={"Confirm Password"} margin={"mt-4"} onChange={e => setSignupCredentials({...signupCredentials, confirmPassword: e.target.value})} value={signupCredentials.confirmPassword} error={errors.confirmPassword}/>

                <ButtonAuth buttonLabel={"Sign up"}/>

                <span className="text-center mt-12">
                    Already Signed in? <br /> <Link href={"/login"} className="underline hover:text-brandLight">Login here</Link>
                </span>
            </form>

        </div>
    )
}

export default SignupPage