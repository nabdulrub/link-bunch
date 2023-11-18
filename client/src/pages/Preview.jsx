import LinksPreview from "../components/preview/LinksPreview";
import PreviewNavbar from "../components/preview/PreviewNavbar";
import { getSession } from "../hooks/useAuth";

const Preview = () => {
  const session = getSession();

  return (
    <div>
      <div className="md:bg-[#633CFF] w-full h-[35vh] absolute -z-10 top-0 left-0 rounded-br-3xl rounded-bl-3xl bg-white"></div>
      {session && <PreviewNavbar />}

      <LinksPreview />
    </div>
  );
};

export default Preview;
