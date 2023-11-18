import copy from "copy-to-clipboard";
import { useState } from "react";
import Toast from "../../Toast";
import Button from "../Button";
import Copy from "../icons/Copy";

const PreviewNavbar = () => {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    copy(window.location.href);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 4000);
  };

  return (
    <div className="bg-white flex justify-between p-4 items-center rounded-xl m-6 md:shadow-xl">
      <Button variant="outline" href={"/dashboard?tabs=links"}>
        Back to Editor
      </Button>
      <Button variant="default" className="py-6" onClick={copyLink}>
        Share Link
      </Button>

      <Toast
        message={"The link has been copied to your clipboard!"}
        show={copied}
        icon={<Copy className={"fill-gray-500"} />}
      />
    </div>
  );
};

export default PreviewNavbar;
