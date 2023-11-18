import ArrowRight from "../icons/ArrowRight";
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

const PhoneLink = ({
  title,
  normal,
  className,
  position = 0,
  fontColor = "text-white",
}) => {
  const linkPosition =
    position === 0
      ? "top-[17.4rem]"
      : position === 1
      ? "top-[21.4rem]"
      : position === 2
      ? "top-[25.4rem]"
      : position === 3
      ? "top-[29.4rem]"
      : position === 4
      ? "top-[33.4rem]"
      : "top-[17.4rem]";

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

  const linkStyle = PhoneLinkData[title];

  return (
    <div
      className={`${linkStyle?.color || "bg-gray-800"} w-full rounded-lg  ${
        !normal ? "absolute max-w-[237px] h-[44px]" + " " + linkPosition : null
      } left-9 flex items-center p-4 justify-between hover:bg-opacity-90 ${className}`}
    >
      <div className="flex gap-2 items-center">
        {linkStyle?.icon}
        <p
          className={`${
            title === "Frontend Mentor" ? "text-black" : fontColor
          }`}
        >
          {title}
        </p>
      </div>
      <ArrowRight
        color={title === "Frontend Mentor" ? "#000" : "#fff"}
        className={"w-4 h-4"}
      />
    </div>
  );
};

export default PhoneLink;
