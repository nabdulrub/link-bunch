import express from "express";
import { UserManager } from "../../entities/users/users.manager.js";
import { LinkManager } from "../../entities/links/links.manager.js";
const router = express.Router();

const { getUserById } = UserManager();
const { getAllLinks } = LinkManager();

// Define your user routes
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await getUserById({ userId: id });

    if (user.status !== 200) {
      return res.status(user.status).json(user.message);
    }

    const links = await getAllLinks({ userId: id });

    res.status(user.status).json({ user: user.user, links: links.links });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error Finding User" });
  }
});

export default router;
