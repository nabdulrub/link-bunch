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

  const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    try {
      const verified = jwt.verify(token, secret);

      if (!verified) return res.status(401).json({ error: "Unauthorized" });

      next();
    } catch (error) {
      console.error("Error authenticating user or bad token!");
      res.status(500).json({ error: "Internal Server Error Finding User" });
    }
  };

  return { createToken, verifyToken };
};
