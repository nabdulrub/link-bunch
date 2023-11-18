import { useUser } from "../../context/UserContext";
import UpdateInfo from "../UpdateInfo";
import UploadImage from "../UploadImage";

const ProfileDetails = () => {
  const { userData, revalidate } = useUser();

  return (
    <div className="min-h-full flex-1 rounded-xl bg-white relative">
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
          <UploadImage avatar={userData?.avatar} revalidate={revalidate} />
        </div>
        <div>
          {userData && <UpdateInfo user={userData} revalidate={revalidate} />}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
