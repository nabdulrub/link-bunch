import { useNavigate, useSearchParams } from "react-router-dom";
import PhoneMockup from "../components/dashboard/PhoneMockup";
import { getSession, getToken } from "../hooks/useAuth";
import ProfileDetails from "../components/dashboard/ProfileDetails";
import Links from "../components/dashboard/Links";
import { useEffect } from "react";

const Dashboard = () => {
  const session = getSession();
  const token = getToken();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab");

  useEffect(() => {
    if (!session) {
      return navigate("/");
    }
  }, [session, navigate]);

  useEffect(() => {
    const getuser = async () => {
      try {
        const user = await fetch("/api/users", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });
        console.log(await user.text());
      } catch (error) {
        console.log(error);
      }
    };

    getuser();
  }, []);

  return (
    <div className="flex gap-6 min-h-full">
      <PhoneMockup />
      {currentTab === "profile" ? <ProfileDetails /> : <Links />}
    </div>
  );
};

export default Dashboard;
