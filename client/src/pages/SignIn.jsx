import { useEffect } from "react";
import SignInForm from "../components/auth/SignInForm";
import { autoLogin, getSession } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const session = getSession();

    if (session) {
      navigate("/dashboard?tab=links");
    } else {
      autoLogin();
    }
  }, [navigate]);

  return <SignInForm />;
};

export default SignIn;
