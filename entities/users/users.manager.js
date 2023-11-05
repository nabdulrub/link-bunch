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

  const updateUser = () => {};

  const deleteUser = () => {};

  const getUserById = () => {};

  const getUserByEmail = () => {};

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
    deleteUser,
    getUserById,
    getUserByEmail,
    signInUser,
  };
};
