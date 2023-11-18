import Link from "./links.model.js";

export const LinkManager = () => {
  const createLink = async ({ link, platform, userId }) => {
    try {
      const newLink = new Link({
        link,
        platform,
        userId,
      });

      await newLink.save();

      return {
        link: { ...newLink },
        status: 200,
        message: "Link Added Successfully",
      };
    } catch (error) {
      console.error("Internal Server Error:", error);
      return { status: 500, message: "Internal Server Error Adding Link" };
    }
  };

  const getAllLinks = async ({ userId }) => {
    try {
      const links = await Link.find({ userId });

      if (!links) {
        return { status: 404, message: "User does not have any links" };
      }

      return {
        links,
        status: 200,
        message: "Links Found Successfully",
      };
    } catch (error) {
      console.error("Internal Server Error:", error);
      return { status: 500, message: "Internal Server Error Adding Link" };
    }
  };

  const deleteLink = async ({ id }) => {
    try {
      const existingLink = await Link.deleteOne({ _id: id });

      if (!existingLink) {
        return { status: 404, message: "Link does not exist" };
      }

      return {
        status: 200,
        message: "Link Deleted In Successfully",
      };
    } catch (error) {
      console.error("Internal Server Error:", error);
      return { status: 500, message: "Internal Server Error Deleting Link" };
    }
  };

  return {
    createLink,
    deleteLink,
    getAllLinks,
  };
};
