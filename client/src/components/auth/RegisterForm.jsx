import { useForm } from "react-hook-form";
import Input from "../Input";
import emailsvg from "../../assets/images/icon-email.svg";
import passwordsvg from "../../assets/images/icon-password.svg";
import devlinks from "../../assets/images/logo-devlinks-large.svg";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: {
      errors: { password, email, confirmedPassword },
    },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmedPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: data.password,
          email: data.email,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        reset();
        navigate("/");
      }

      console.log(result);

      console.log(response);
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
            <p className="text-4xl font-bold">Create account</p>
            <p className="text-gray-400">
              Let&apos;s get you started sharing your links!
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
              label={"Create Password"}
              required
              placeholder={"At least 8 characters"}
              type={"password"}
              icon={passwordsvg}
              error={password?.message}
            />
            <Input
              control={control}
              name={"confirmPassword"}
              label={"Confirm Password"}
              required
              placeholder={"At least 8 characters"}
              type={"password"}
              icon={passwordsvg}
              error={confirmedPassword?.message}
              validate={(v) => {
                return v === watch("password") || "Passwords don't match";
              }}
            />
          </div>
          <p className="text-sm text-gray-400">
            Password must contain at least 8 characters
          </p>
          <button
            type="submit"
            className="bg-[#633CFF] text-white py-3 px-2 w-full rounded-lg hover:opacity-50 hover:shadow-xl hover:shadow-[#cfc4ff] transition-all duration-500"
          >
            Create New Account
          </button>
          <p className="text-gray-400 w-full text-center flex md:flex-row flex-col md:gap-1">
            Already have an account?{" "}
            <a className="text-[#633CFF] hover:text-[#49398b]" href="/">
              Login
            </a>
          </p>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
