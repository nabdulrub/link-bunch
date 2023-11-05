import links from "../../assets/images/icon-links-header.svg";
import profile from "../../assets/images/icon-profile-details-header.svg";
import devlinks from "../../assets/images/logo-devlinks-large.svg";
import { useAuth } from "../../hooks/AuthProvider";
import Button from "../Button";

const Navbar = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="bg-white p-4 rounded-xl max-w-[1920px] mx-auto flex justify-between items-center mb-6">
      <img src={devlinks} alt="logo" />
      <div className="flex gap-4">
        <a href={`/dashboard`}>
          <button className="flex gap-1 items-center bg-[#EFEBFF] text-[#633CFF] font-bold rounded-lg px-[1.69rem] py-[.69rem]">
            <img src={links} alt="link" className="text-[#633CFF] w-5" />
            Links
          </button>
        </a>
        <a href={`/profile/${user?.id}`}>
          <button className="flex gap-1 items-center  hover:text-[#633CFF] transition-all duration-200 font-bold  px-[1.69rem] py-[.69rem]">
            <img src={profile} alt="link" className="w-5" />
            Profile Details
          </button>
        </a>
      </div>

      <div className="flex gap-4">
        <button className="flex gap-1 border-2 border-[#633CFF] bg-white transition-all duration-300 hover:bg-[#EFEBFF] text-[#633CFF] font-bold rounded-lg px-[1.69rem] py-[.69rem]">
          Preview
        </button>
        <button
          onClick={signOut}
          className="flex gap-1 border-2 border-red-500 bg-white transition-all duration-300 hover:bg-[#EFEBFF] text-red-500 font-bold rounded-lg px-[1.69rem] py-[.69rem]"
        >
          Sign Out
        </button>
        <Button>Name</Button>
      </div>
    </div>
  );
};

export default Navbar;
