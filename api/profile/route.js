import express from "express";
import { UserManager } from "../../entities/users/users.manager.js";
import { AuthManager } from "../../managers/Auth.manager.js";
const router = express.Router();

const { uploadUserAvatar, updateUser } = UserManager();
const { verifyToken } = AuthManager();

router.post("/upload/avatar", verifyToken, async (req, res) => {
  try {
    const { base64, userId } = req.body;

    const updatedUser = await uploadUserAvatar({ base64, userId });
    console.log(updatedUser);

    if (updatedUser.status !== 200) {
      return res.status(updatedUser.status).json(updatedUser.message);
    }

    res.status(updatedUser.status).json({ ...updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error Uploading File" });
  }
});

router.put("/info", verifyToken, async (req, res) => {
  try {
    const { firstname, lastname, email, userId } = req.body;

    const updatedUser = await updateUser({
      firstname,
      lastname,
      email,
      userId,
    });

    console.log(lastname);

    if (updatedUser.status !== 200) {
      return res.status(updatedUser.status).json(updatedUser.message);
    }

    res.status(updatedUser.status).json({ ...updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error Uploading File" });
  }
});

export default router;
