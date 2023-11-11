import express from "express";
import { UserManager } from "../../entities/users/users.manager.js";
import { AuthManager } from "../../managers/Auth.manager.js";
const router = express.Router();

const { getUserById } = UserManager();
const { verifyToken } = AuthManager();

// Define your user routes
router.post("/", verifyToken, async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await getUserById({ userId });

    if (user.status !== 200) {
      return res.status(user.status).json(user.message);
    }

    res.status(user.status).json({ ...user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error Finding User" });
  }
});

export default router;
