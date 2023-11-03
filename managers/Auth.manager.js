import jwt from "jsonwebtoken";

export const AuthManager = () => {
  const secret = process.env.JWT_SECRET;

  const createToken = (id) => {
    try {
      const data = {
        time: Date(),
        id,
      };
      const token = jwt.sign(data, secret);

      return { token };
    } catch (error) {
      console.error(error);

      return { error: error };
    }
  };

  const verifyToken = (token) => {
    try {
      const verified = jwt.verify(token, secret);

      if (verified) return { token, auth: true };

      return { token, auth: false };
    } catch (error) {
      console.error("Error authenticating user or bad token!");
      return { error: error, auth: false };
    }
  };

  return { createToken, verifyToken };
};
