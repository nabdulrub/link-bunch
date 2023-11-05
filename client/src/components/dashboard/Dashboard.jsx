import React from "react";
import PhoneMockup from "./PhoneMockup";
import AddLinks from "./AddLinks";
import { useAuth } from "../../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn) return navigate("/");

  return (
    <div className="flex gap-6 h-[calc(100vh-8.1rem)]">
      <PhoneMockup />
      <AddLinks />
    </div>
  );
};

export default Dashboard;
