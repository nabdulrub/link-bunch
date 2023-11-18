import Button from "./Button";
import Input from "./Input";
import linkicon from "../assets/images/icon-link.svg";
import github from "../assets/images/icon-github.svg";
import linkedin from "../assets/images/icon-linkedin.svg";
import youtube from "../assets/images/icon-youtube.svg";
import facebook from "../assets/images/icon-facebook.svg";
import hashnode from "../assets/images/icon-hashnode.svg";
import frontendMentor from "../assets/images/icon-frontend-mentor.svg";
import codepen from "../assets/images/icon-codepen.svg";
import devto from "../assets/images/icon-devto.svg";
import freecodecamp from "../assets/images/icon-freecodecamp.svg";
import gitlab from "../assets/images/icon-gitlab.svg";
import twitch from "../assets/images/icon-twitch.svg";
import twitter from "../assets/images/icon-twitter.svg";
import stackoverflow from "../assets/images/icon-stack-overflow.svg";
import twoLines from "../assets/images/icon-drag-and-drop.svg";

import Dropdown from "./Dropdown";

const platformOptions = [
  { value: "GitHub", icon: github },
  { value: "YouTube", icon: youtube },
  { value: "LinkedIn", icon: linkedin },
  { value: "Facebook", icon: facebook },
  { value: "Frontend Mentor", icon: frontendMentor },
  { value: "Hashnode", icon: hashnode },
  { value: "CodePen", icon: codepen },
  { value: "DevTo", icon: devto },
  { value: "Free Code Camp", icon: freecodecamp },
  { value: "GitLab", icon: gitlab },
  { value: "Twitch", icon: twitch },
  { value: "Twitter", icon: twitter },
  { value: "StackOverflow", icon: stackoverflow },
];

const LinkForm = ({ index, remove, control, errors }) => {
  return (
    <div className="bg-gray-50 p-5 w-full rounded-xl">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-2">
          <img src={twoLines} alt="twoLines" className="w-5 h-5" />
          <p className="text-gray-500 font-semibold">Link #{index + 1}</p>
        </div>
        <Button
          variant="ghost"
          className={"text-gray-500 font-medium"}
          onClick={() => remove(index)}
        >
          Remove
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Dropdown
          options={platformOptions}
          control={control}
          required
          error={errors?.platform?.message}
          name={`links.${index}.platform`}
        />
        <Input
          required
          control={control}
          name={`links.${index}.link`}
          label={"Link"}
          icon={linkicon}
          error={errors?.link?.message}
          placeholder={"e.g. https://www.github.com/johnappleseed"}
        />
      </div>
    </div>
  );
};

export default LinkForm;
