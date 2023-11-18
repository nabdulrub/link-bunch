import express from "express";
import { LinkManager } from "../../entities/links/links.manager.js";
import { AuthManager } from "../../managers/Auth.manager.js";
const router = express.Router();

const { createLink, getAllLinks, deleteLink } = LinkManager();
const { verifyToken } = AuthManager();

// Define your user routes
router.post("/", verifyToken, async (req, res) => {
  try {
    const { platform, link, userId } = req.body;

    const newLink = await createLink({ link, platform, userId });

    if (newLink.status !== 200) {
      return res.status(newLink.status).json(newLink.message);
    }

    res.status(newLink.status).json({ ...newLink });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error Adding Link" });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const { userId } = req.body;

    const links = await getAllLinks({ userId });

    if (links.status !== 200) {
      return res.status(links.status).json(links.message);
    }

    res.status(links.status).json({ ...links });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error Getting Links" });
  }
});

router.delete("/", verifyToken, async (req, res) => {
  try {
    const { id } = req.body;

    const link = await deleteLink({ id });

    if (link.status !== 200) {
      return res.status(link.status).json(link.message);
    }

    res.status(link.status).json({ message: "Link Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error Deleting Link" });
  }
});

export default router;
