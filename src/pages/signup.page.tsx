import ButtonAuth from "@/components/auth/button.auth";
import InputFieldAuth from "@/components/auth/inputfield.auth";
import ToggleThemeButton from "@/components/theme/button.toggletheme";
import useValidation from "@/utils/auth/validation.auth";
import axiosInstance from "@/utils/axiosinstance";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NProgress from "nprogress";

interface SignupCredentialsProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupPage = () => {
  const router = useRouter();
  const { errors, validateFields, setErrors } = useValidation();

  const [signupCredentials, setSignupCredentials] = useState<SignupCredentialsProps>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    NProgress.start();

    const { firstName, lastName, email, password, confirmPassword } = signupCredentials;
    const validationErrors = validateFields(
      { firstName, lastName, email, password, confirmPassword },
      ["firstName", "lastName", "email", "password", "confirmPassword"]
    );

    if (!/\S+@\S+\.\S+/.test(email)) validationErrors.email = "Enter a valid email";
    if (password.length < 8) validationErrors.password = "Password must be at least 8 characters";
    if (password !== confirmPassword) validationErrors.confirmPassword = "Passwords do not match";

    const filteredErrors = Object.fromEntries(
      Object.entries(validationErrors).filter(([key, value]) => value)
    );

    if (Object.keys(filteredErrors).length) {
      setErrors(filteredErrors);
      NProgress.done();
      return;
    }

    try {
      const response = await axiosInstance.post("api/register", {
        name: `${firstName} ${lastName}`,
        email,
        password,
      });

      if (response.status === 200) {
        setSignupCredentials({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        router.replace('/home');
      }
    } catch (error) {
      console.error("Error during signup:", error);
    } finally {
      NProgress.done();
    }
  };

  return (
    <div className="w-screen gap-10 h-screen flex pt-4 overflow-auto flex-col items-center">
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
      <form className="flex flex-col w-[35%]" onSubmit={handleSignup}>
        <div className="flex gap-10">
          <div className="flex flex-col w-1/2">
            <InputFieldAuth
              label="Firstname"
              onChange={(e) => setSignupCredentials({ ...signupCredentials, firstName: e.target.value })}
              value={signupCredentials.firstName}
              error={errors.firstName}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <InputFieldAuth
              label="Lastname"
              onChange={(e) => setSignupCredentials({ ...signupCredentials, lastName: e.target.value })}
              value={signupCredentials.lastName}
              error={errors.lastName}
            />
          </div>
        </div>
        <InputFieldAuth
          label="Email"
          margin="mt-4"
          onChange={(e) => setSignupCredentials({ ...signupCredentials, email: e.target.value })}
          value={signupCredentials.email}
          error={errors.email}
        />
        <InputFieldAuth
          label="Password"
          margin="mt-4"
          onChange={(e) => setSignupCredentials({ ...signupCredentials, password: e.target.value })}
          value={signupCredentials.password}
          error={errors.password}
        />
        <InputFieldAuth
          label="Confirm Password"
          margin="mt-4"
          onChange={(e) => setSignupCredentials({ ...signupCredentials, confirmPassword: e.target.value })}
          value={signupCredentials.confirmPassword}
          error={errors.confirmPassword}
        />
        <ButtonAuth buttonLabel="Sign up" />
        <span className="text-center mt-12">
          Already Signed in? <br /> <Link href="/login" className="underline hover:text-brandPrimary">Login here</Link>
        </span>
      </form>
      <ToggleThemeButton isAuthenticated={false} />
    </div>
  );
};

export default SignupPage;