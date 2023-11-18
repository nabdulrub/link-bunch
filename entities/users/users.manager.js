import User from "./users.model.js";
import bcrypt from "bcrypt";

export const UserManager = () => {
  const createUser = async ({ email, password }) => {
    try {
      const existing = await User.findOne({ email });

      if (existing) {
        return { status: 409, message: "User already exists" };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        email,
        password: hashedPassword,
      });

      await newUser.save();

      return {
        user: { ...newUser },
        status: 200,
        message: "User Created Successfully",
      };
    } catch (error) {
      console.error("Internal Server Error:", error);
      return { status: 500, message: "Internal Server Error Creating User" };
    }
  };

  const updateUser = async ({ firstname, lastname, email, userId }) => {
    try {
      if (!firstname || !lastname || !email) {
        return { status: 404, message: "No input provided from body" };
      }

      if (!userId) {
        return { status: 404, message: "No user id provided from body" };
      }

      const updatedUser = await User.findById(userId);

      if (!updatedUser) {
        return { status: 404, message: "User not found" };
      }

      updatedUser.firstname = firstname;
      updatedUser.lastname = lastname;
      updatedUser.email = email;

      await updatedUser.save();

      return {
        user: { ...updatedUser },
        status: 200,
        message: "User info updated successfully",
      };
    } catch (error) {
      console.error("Internal Server Error:", error);
      return {
        status: 500,
        message: "Internal Server Error Updating User Info",
      };
    }
  };

  const getUserById = async ({ userId }) => {
    try {
      if (!userId) {
        return { status: 404, message: "No userId provided in input" };
      }

      const user = await User.findById(userId);

      if (!user) {
        return { status: 404, message: "User does not exist" };
      }

      return {
        user,
        status: 200,
        message: "User found successfully",
      };
    } catch (error) {
      console.error("Internal Server Error:", error);
      return {
        status: 500,
        message: "Internal Server Error Finding User Avatar",
      };
    }
  };

  const uploadUserAvatar = async ({ base64, userId }) => {
    try {
      if (!base64 && !userId) {
        return { status: 404, message: "No Image or title found in input" };
      }

      const updatedUser = await User.findById(userId);

      updatedUser.avatar = base64;

      await updatedUser.save();

      return {
        user: { ...updatedUser },
        status: 200,
        message: "User avatar added successfully",
      };
    } catch (error) {
      console.error("Internal Server Error:", error);
      return {
        status: 500,
        message: "Internal Server Error Adding User Avatar",
      };
    }
  };

  const signInUser = async ({ email, password }) => {
    try {
      const existing = await User.findOne({ email });

      if (!existing) {
        return { status: 404, message: "User does not exist" };
      }

      const passwordCheck = await bcrypt.compare(
        password,
        existing._doc.password
      );

      if (!passwordCheck) {
        return {
          status: 401,
          message: "User password incorrect, unauthorized",
        };
      }

      return {
        user: { ...existing },
        status: 200,
        message: "User Signed In Successfully",
      };
    } catch (error) {
      console.error("Internal Server Error:", error);
      return { status: 500, message: "Internal Server Error Creating User" };
    }
  };

  return {
    createUser,
    updateUser,
    getUserById,
    signInUser,
    uploadUserAvatar,
  };
};
