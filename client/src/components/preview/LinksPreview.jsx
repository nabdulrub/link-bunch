import PhoneLink from "../dashboard/PhoneLink";
import { useEffect, useState } from "react";
import { getUserByParams } from "../../fetch/getUserByParams";
import { useParams } from "react-router-dom";

const LinksPreview = () => {
  const [userData, setUserData] = useState(null);
  const [links, setLinks] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const user = await getUserByParams({ id });
      if (user) {
        setUserData(user.user);
        setLinks(user.links);
      }
    };

    getData();
  }, []);

  return (
    <div className="bg-white p-14 max-w-[350px] md:shadow-xl grid gap-10 rounded-3xl mt-20 mx-auto">
      <div className="flex flex-col items-center justify-between gap-4">
        <img
          src={userData?.avatar}
          alt="user"
          className=" w-28 h-28 object-cover rounded-full border-4 border-[#633CFF]"
        />
        <p className="font-bold text-2xl">
          {userData?.firstname} {userData?.lastname}
        </p>
        <p className="text-gray-500 text-sm">{userData?.email}</p>
      </div>
      <div className="grid gap-5">
        {links?.map((link) => {
          return (
            <a
              href={link?.link}
              key={link._id}
              target="_blank"
              rel="noreferrer"
            >
              <PhoneLink title={link?.platform} normal />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default LinksPreview;
