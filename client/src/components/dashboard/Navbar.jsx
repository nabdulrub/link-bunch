import links from "../../assets/images/icon-links-header.svg";
import profile from "../../assets/images/icon-profile-details-header.svg";
import large_devlinks from "../../assets/images/logo-devlinks-large.svg";
import small_devlinks from "../../assets/images/logo-devlinks-small.svg";
import eye from "../../assets/images/icon-preview-header.svg";

import { getSession, signOut } from "../../hooks/useAuth";
import Button from "../Button";
import { useNavigate, useSearchParams } from "react-router-dom";

const Navbar = () => {
  const session = getSession();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab");

  const isLinksActive = activeTab === "links" || activeTab === null;
  const isProfileActive = activeTab === "profile";

  return session ? (
    <div className="bg-white p-4 rounded-xl max-w-[1920px] mx-auto flex justify-between items-center mb-6">
      <picture>
        <source media="(max-width:768px)" srcSet={small_devlinks} />
        <img src={large_devlinks} alt="logo" />
      </picture>

      <div className="flex gap-4">
        <Button
          href={`/dashboard?tab=links`}
          variant={isLinksActive ? "secondary" : "ghost"}
          icon={<img src={links} alt="link" className="text-[#633CFF] w-6 " />}
        >
          <span className="hidden md:block">Links</span>
        </Button>
        <Button
          href={`/dashboard?tab=profile`}
          variant={isProfileActive ? "secondary" : "ghost"}
          className="gap-2"
          icon={<img src={profile} alt="link" className="w-7" />}
        >
          <span className="hidden md:block">Profile Details</span>
        </Button>
      </div>

      <div className="flex gap-4 items-center justify-center">
        <Button
          href={"/preview"}
          variant="outline"
          icon={<img src={eye} alt="eye" className="block md:hidden" />}
        >
          <span className="hidden md:block">Preview</span>
        </Button>
        <Button
          variant="destructive"
          className={"lg:block hidden"}
          onClick={() => {
            signOut();
            navigate("/");
          }}
        >
          Sign Out
        </Button>
      </div>
    </div>
  ) : null;
};

export default Navbar;
