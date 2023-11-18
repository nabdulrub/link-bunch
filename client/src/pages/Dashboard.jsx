import { useNavigate, useSearchParams } from "react-router-dom";
import PhoneMockup from "../components/dashboard/PhoneMockup";
import { getSession } from "../hooks/useAuth";
import ProfileDetails from "../components/dashboard/ProfileDetails";
import Links from "../components/dashboard/Links";
import { useEffect } from "react";

const Dashboard = () => {
  const session = getSession();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab");

  useEffect(() => {
    if (!session) {
      return navigate("/");
    }
  }, [session, navigate]);

  return (
    <div className="flex gap-6 min-h-full">
      <PhoneMockup />
      {currentTab === "profile" ? <ProfileDetails /> : <Links />}
    </div>
  );
};

export default Dashboard;
