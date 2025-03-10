import ButtonAuth from "@/components/auth/button.auth";
import InputFieldAuth from "@/components/auth/inputfield.auth";
import Link from "next/link";
import { useState } from "react";
import NProgress from "nprogress";
import axiosInstance from "@/utils/axiosinstance";
import { useRouter } from "next/navigation";
import ToggleThemeButton from "@/components/theme/button.toggletheme";
import useValidation from "@/utils/auth/validation.auth";
import axios from "axios";
import Cookies from "js-cookie";

interface LoginCredentialsProps {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const { errors, setErrors } = useValidation();
  const [loginCredentials, setLoginCredentials] = useState<LoginCredentialsProps>({ email: "", password: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    NProgress.start();

    const { email, password } = loginCredentials;
    const newErrors: LoginCredentialsProps = { email: "", password: "" };

    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Enter a valid email";

    if (!password) newErrors.password = "Password is required";

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      NProgress.done();
      return;
    }

    try {
      const loginResponse = await axiosInstance.post(
        "/api/login",
        { email, password },  
      );
      
      // If the login and user fetch were successful, proceed with the following
      if (loginResponse.status === 200) {
        setLoginCredentials({ email: "", password: "" });
        router.replace("/home");
        setErrors({ email: "", password: "" });
      }
      
    } catch (error) {
      setErrors({ email: "Incorrect email or password", password: "Incorrect email or password" });
    } finally {
      NProgress.done();
    }
  };

  return (
    <div className="w-screen gap-10 h-screen flex justify-center overflow-auto flex-col items-center">
      {/* Header with logo and title */}
      <div className="flex gap-10 items-center">
        <h1 className="font-bold text-6xl text-brandPrimary">BudgetWise</h1>
        {/* Logo */}
        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 48 48">
          <path
            fill="#3366B3"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m24.437 11.219l-2.649-4.78l-13.092 8.456m26.321 0l-4.288-7.74l-11.984 7.74m16 13.675a2.047 2.047 0 1 1-2.045-2.047h0c1.13 0 2.045.916 2.045 2.047m-2.54 5.804c-3.23 0-5.831-2.568-5.831-5.757s2.6-5.756 5.832-5.756l9.127-.097c.648 0 1.168.52 1.168 1.166v9.18c0 .647-.52 1.167-1.167 1.167zm7.825-.085v4.238a3.026 3.026 0 0 1-3.019 3.034H8.532A3.026 3.026 0 0 1 5.5 38.543V17.927a3.026 3.026 0 0 1 3.02-3.033h28.477a3.026 3.026 0 0 1 3.033 3.02v4.864"
          />
        </svg>
      </div>

      {/* Form */}
      <form className="flex flex-col w-[25%]" onSubmit={handleLogin}>
        <InputFieldAuth
          label="Email"
          onChange={(e) => setLoginCredentials({ ...loginCredentials, email: e.target.value })}
          value={loginCredentials.email}
          error={errors.email}
        />
        <InputFieldAuth
          label="Password"
          margin="mt-8"
          onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })}
          value={loginCredentials.password}
          error={errors.password}
        />
        <ButtonAuth buttonLabel="Login" />
        <span className="text-center mt-12">
          No account yet? <br /> <Link href="/signup" className="underline hover:text-brandPrimary">Sign up here</Link>
        </span>
      </form>

      <ToggleThemeButton isAuthenticated={false} />
    </div>
  );
};

export default LoginPage;