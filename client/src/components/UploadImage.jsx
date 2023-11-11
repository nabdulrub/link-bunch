import React, { useState } from "react";
import { convertBase64 } from "../../utils/convertBase64.js";
import { useNavigate } from "react-router-dom";
import { getSession, getToken } from "../hooks/useAuth.jsx";
import Upload from "./icons/Upload.jsx";
import Loader from "./icons/Loader.jsx";

const UploadImage = ({ avatar, revalidate }) => {
  const user = getSession();
  const token = getToken();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [file, setFile] = useState("");

  const uploadImage = async (base64) => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:3000/api/profile/upload/avatar",
        {
          method: "POST",
          body: JSON.stringify({ base64, userId: user.id }),
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.ok) {
        await revalidate();
      }

      if (!response.ok) {
        setError("Failed to upload avatar!");
      }

      const result = await response.json();

      return result;
    } catch (error) {
      console.error("Error uploading avatar:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file) => {
    setError("");
    setLoading(true);
    if (!file) return setError("You must upload an image first!");
    const base64 = await convertBase64(file);

    await uploadImage(base64);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-5 flex justify-between gap-2 lg:gap-40 md:items-center h-[333px] md:h-[200px] flex-col md:flex-row">
      <div className="md:flex-1 lg:flex-none">
        <p className="text-gray-500">Profile picture</p>
      </div>

      <div className=" flex md:flex-row flex-col items-start md:items-center justify-start md:justify-end lg:justify-start h-full gap-4 flex-1">
        <label
          style={{
            backgroundImage: `url(${avatar})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className={`font-bold gap-2 cursor-pointer hover:bg-[#e4ddff] bg-[#633CFF] ${
            avatar ? "text-white" : "text-[#633CFF]"
          } rounded-lg w-full flex flex-col items-center justify-center max-w-[193px] max-h-[193px] h-full transition-all duration-300 md:min-w-[200px]`}
        >
          {loading ? (
            <Loader className={"animate-spin"} color={avatar && "#fff"} />
          ) : (
            <>
              <Upload color={avatar && "#fff"} />
              <input
                type="file"
                name="avatar"
                className="hidden"
                onChange={(e) => {
                  handleUpload(e.target.files[0]);
                }}
              />
              {avatar ? "Change Image" : "+ Upload Image"}
            </>
          )}
        </label>
        <div className="text-gray-500 text-sm md:max-w-[230px]">
          <p>Image must be below 1024x1024px. Use PNG or JPG format.</p>
        </div>

        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default UploadImage;
