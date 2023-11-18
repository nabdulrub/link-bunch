import express from "express";
import { AuthManager } from "../../managers/Auth.manager.js";
import { validationResult } from "express-validator";
import { signInValidator } from "../../entities/users/users.validator.js";
import { UserManager } from "../../entities/users/users.manager.js";
const router = express.Router();
const auth = AuthManager();
const { signInUser } = UserManager();

router.post("/", signInValidator, async (req, res) => {
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (errors.errors.length > 0) {
      return res.status(406).json("Bad Info");
    }

    const existingUser = await signInUser({ email, password });

    if (existingUser.status !== 200) {
      return res.status(existingUser.status).json(existingUser.message);
    }

    const token = auth.createToken(existingUser.user._doc._id);

    res.status(200).json({
      ...token,
      auth: true,
      session: {
        email: existingUser.user._doc.email,
        id: existingUser.user._doc._id,
      },
    });
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

export default router;
