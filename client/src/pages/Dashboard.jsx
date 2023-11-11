import { useNavigate, useSearchParams } from "react-router-dom";
import PhoneMockup from "../components/dashboard/PhoneMockup";
import { getSession } from "../hooks/useAuth";
import ProfileDetails from "../components/dashboard/ProfileDetails";
import Links from "../components/dashboard/Links";

const Dashboard = () => {
  const session = getSession();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab");

  if (!session) return navigate("/");

  return (
    <div className="flex gap-6 h-[83.3vh]">
      <PhoneMockup />
      {currentTab === "profile" ? <ProfileDetails /> : <Links />}
    </div>
  );
};

export default Dashboard;
