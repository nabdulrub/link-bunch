import copy from "copy-to-clipboard";
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import Toast from "../../Toast";
import { useLinks } from "../../context/LinkContext";
import { getToken } from "../../hooks/useAuth";
import ArrowRight from "../icons/ArrowRight";
import Copy from "../icons/Copy";

const CurrentLink = ({ link, icon, platform, id }) => {
  const [copied, setCopied] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { revalidate } = useLinks();
  const token = getToken();

  const copyToClipboard = () => {
    copy(link);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/links", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        await revalidate();
        setDeleted(true);
        setTimeout(() => {
          setDeleted(false);
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-gray-100 text-black p-3 px-4 my-4 rounded-lg flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <p>{platform}</p>
      </div>
      <div className="flex gap-6 items-center">
        <button onClick={copyToClipboard} disabled={copied}>
          {copied ? <>Copied</> : <Copy />}
        </button>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="flex gap-1 items-center"
        >
          Visit <ArrowRight className={"w-5 h-5"} color="#000" />
        </a>
        <button
          className="flex gap-2 items-center"
          onClick={onDelete}
          disabled={loading}
        >
          {loading ? (
            <>...</>
          ) : (
            <>
              Remove <GrClose className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
      <Toast
        message={`Deleted the ${platform} link from your profile!`}
        show={deleted}
      />
    </div>
  );
};

export default CurrentLink;
