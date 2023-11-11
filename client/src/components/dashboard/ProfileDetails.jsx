import React, { useEffect } from "react";
import { useState } from "react";
import UploadImage from "../UploadImage";
import UpdateInfo from "../UpdateInfo";
import { getUser } from "../../fetch/getUser";

const ProfileDetails = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUserProfile() {
      const user = await getUser();
      setUser(user.user);
    }

    getUserProfile();
  }, []);

  const revalidateUser = async () => {
    const userData = await getUser();
    setUser(userData.user);
  };

  return (
    <div className="h-full flex-1 rounded-xl bg-white relative">
      <div className="p-2 md:p-10 flex flex-col gap-10">
        <div className="flex flex-col gap-10 md:gap-8">
          <div className="flex flex-col gap-2 md:gap-4">
            <p className="text-2xl md:text-4xl font-bold">Profile Details</p>
            <p className="text-gray-500">
              Add your details to add a personal touch to your profile.
            </p>
          </div>
        </div>
        <div>
          <UploadImage avatar={user?.avatar} revalidate={revalidateUser} />
        </div>
        <div>
          {user && <UpdateInfo user={user} revalidate={revalidateUser} />}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
