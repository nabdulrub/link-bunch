import RegisterForm from "../components/auth/RegisterForm";
import { getSession } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const session = getSession();
  const navigate = useNavigate();

  if (session) return navigate("/dashboard");

  return <RegisterForm />;
};

export default Register;
