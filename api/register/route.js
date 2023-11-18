import express from "express";
const router = express.Router();
import { validationResult } from "express-validator";
import { registerValidator } from "../../entities/users/users.validator.js";
import { UserManager } from "../../entities/users/users.manager.js";

const { createUser } = UserManager();

router.post("/", registerValidator, async (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (errors.errors.length > 0) {
    return res.status(406).json("Bad Input");
  }

  const newUser = await createUser({ email, password });

  if (newUser.status !== 200) {
    return res.status(newUser.status).json(newUser.message);
  }

  res.status(newUser.status).json({ ...newUser });
});

export default router;
