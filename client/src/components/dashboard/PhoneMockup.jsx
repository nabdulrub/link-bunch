import Phone from "../icons/Phone";
import { useLinks } from "../../context/LinkContext";
import { useUser } from "../../context/UserContext";

import PhoneLink from "./PhoneLink";
import {
  CodePen,
  DevTo,
  Facebook,
  FreeCodeCamp,
  FrontendMentor,
  GitLab,
  Github,
  Hashnode,
  LinkedIn,
  StackOverflow,
  Twitch,
  Twitter,
  YouTube,
} from "../icons/Platforms";

const PhoneMockup = () => {
  const { links } = useLinks();
  const { userData } = useUser();

  const PhoneLinkData = {
    GitHub: { color: "bg-gray-800", icon: <Github /> },
    "Frontend Mentor": {
      color: "bg-white border-[1px] border-gray-300 text-black",
      fontColor: "text-black",
      icon: <FrontendMentor />,
    },
    Twitter: { color: "bg-blue-500", icon: <Twitter /> },
    LinkedIn: { color: "bg-blue-600", icon: <LinkedIn /> },
    YouTube: { color: "bg-red-600", icon: <YouTube /> },
    Facebook: { color: "bg-blue-900", icon: <Facebook /> },
    Twitch: { color: "bg-purple-700 ", icon: <Twitch /> },
    DevTo: { color: "bg-gray-700", icon: <DevTo /> },
    "Free Code Camp": { color: "bg-pink-600", icon: <FreeCodeCamp /> },
    GitLab: { color: "bg-orange-600", icon: <GitLab /> },
    Hashnode: { color: "bg-blue-700", icon: <Hashnode /> },
    StackOverflow: { color: "bg-orange-500", icon: <StackOverflow /> },
    CodePen: { color: "bg-black", icon: <CodePen /> },
  };

  return (
    <div className="bg-white flex-[.6] rounded-xl hidden place-items-center lg:grid min-h-[calc(100vh-160px)] max-h-[900px]">
      <div className="relative">
        <Phone />
        <div className="rounded-full absolute top-[4.1rem] left-[6.6rem]">
          <img
            src={userData?.avatar}
            alt=""
            className="rounded-full w-[96px] h-[96px] object-cover border-4 border-[#633CFF]"
          />
        </div>
        <div className="absolute top-[11.1rem] left-[4.6rem] text-center bg-white w-[160px] font-semibold capitalize">
          <p>
            {userData?.firstname} {userData?.lastname}
          </p>
        </div>
        <div className="absolute top-[13rem] left-[4.6rem] flex gap-1 bg-white w-[160px] items-center justify-center text-sm text-gray-500">
          <p>{userData?.email}</p>
        </div>
        {links?.map((link, index) => {
          const linkStyle = PhoneLinkData[link?.platform];
          return (
            <PhoneLink
              key={index}
              title={link?.platform}
              position={index}
              fontColor={linkStyle?.fontColor}
              icon={linkStyle?.icon}
              color={linkStyle?.color}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PhoneMockup;
