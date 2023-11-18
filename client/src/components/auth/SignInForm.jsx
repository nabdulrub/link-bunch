import { useState } from "react";
import { useForm } from "react-hook-form";
import emailsvg from "../../assets/images/icon-email.svg";
import passwordsvg from "../../assets/images/icon-password.svg";
import devlinks from "../../assets/images/logo-devlinks-large.svg";
import { signIn } from "../../hooks/useAuth";
import Input from "../Input";
import { useNavigate } from "react-router-dom";
import { api } from "../../hooks/useFetch";

const SignInForm = () => {
  const [formError, setFormError] = useState(undefined);
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    reset,
    formState: {
      errors: { password, email },
    },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setFormError(undefined);
      const response = await api.post("/api/signin", data);

      if (response) {
        reset();
        signIn({ userData: response?.session, token: response?.token });
        navigate(0);
      }

      if (!response) {
        return setFormError("Please check your password");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[calc(100vw-3rem)] grid md:place-items-center md:h-[calc(100vh-4.5rem)]"
    >
      <div className="w-full grid md:place-items-center gap-12">
        <img src={devlinks} alt="logo" className="p-6 md:p-0" />
        <div className="md:max-w-[500px] md:p-10 bg-white flex flex-col items-start gap-6 w-full rounded-xl">
          <div className="grid gap-4">
            <p className="text-4xl font-bold">Login</p>
            <p className="text-gray-400">
              Add your details below to get back into the app
            </p>
          </div>
          <div className="w-full flex flex-col gap-4">
            <Input
              control={control}
              name={"email"}
              label={"Email Address"}
              required
              placeholder={"e.g. alex@email.com"}
              type={"text"}
              icon={emailsvg}
              error={email?.message}
            />
            <Input
              control={control}
              name={"password"}
              required
              placeholder={"Enter your password"}
              type={"password"}
              icon={passwordsvg}
              error={password?.message}
            />
            {formError && <p className="text-sm text-red-500">{formError}</p>}
          </div>

          <button
            type="submit"
            className="bg-[#633CFF] text-white py-3 px-2 w-full rounded-lg hover:opacity-50 hover:shadow-xl hover:shadow-[#cfc4ff] transition-all duration-500"
          >
            Login
          </button>
          <p className="text-gray-400 w-full text-center flex flex-col md:flex-row md:gap-1">
            Don&apos;t have an account?{" "}
            <a className="text-[#633CFF] hover:text-[#49398b]" href="/register">
              Create account
            </a>
          </p>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
