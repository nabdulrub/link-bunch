import CurrentLink from "./CurrentLink";
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

const CurrentLinks = ({ links }) => {
  const PhoneLinkData = {
    GitHub: { color: "bg-gray-800", icon: <Github color="#000" /> },
    "Frontend Mentor": {
      color: "bg-white border-[1px] border-gray-300 text-black",
      fontColor: "text-black",
      icon: <FrontendMentor color="#000" />,
    },
    Twitter: { color: "bg-blue-500", icon: <Twitter color="#000" /> },
    LinkedIn: { color: "bg-blue-600", icon: <LinkedIn color="#000" /> },
    YouTube: { color: "bg-red-600", icon: <YouTube color="#000" /> },
    Facebook: { color: "bg-blue-900", icon: <Facebook color="#000" /> },
    Twitch: { color: "bg-purple-700 ", icon: <Twitch color="#000" /> },
    DevTo: { color: "bg-gray-700", icon: <DevTo color="#000" /> },
    "Free Code Camp": {
      color: "bg-pink-600",
      icon: <FreeCodeCamp color="#000" />,
    },
    GitLab: { color: "bg-orange-600", icon: <GitLab color="#000" /> },
    Hashnode: { color: "bg-blue-700", icon: <Hashnode color="#000" /> },
    StackOverflow: {
      color: "bg-orange-500",
      icon: <StackOverflow color="#000" />,
    },
    CodePen: { color: "bg-black", icon: <CodePen color="#000" /> },
  };

  return (
    <div>
      {links?.map((link) => {
        const icon = PhoneLinkData[link?.platform];
        return (
          <CurrentLink
            key={link?._id}
            id={link?._id}
            link={link?.link}
            platform={link?.platform}
            icon={icon?.icon}
          />
        );
      })}
    </div>
  );
};

export default CurrentLinks;
