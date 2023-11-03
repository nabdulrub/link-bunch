import express from "express";
const router = express.Router();
import { AuthManager } from "../../managers/Auth.manager.js";
import { validationResult } from "express-validator";
import { registerValidator } from "../../entities/users/users.validator.js";

router.post("/", registerValidator, (req, res) => {
  const auth = AuthManager();
  const errors = validationResult(req);
  if (errors.errors.length > 0) {
    console.log(errors);
    return res.send("Bad Input");
  }

  const token = auth.createToken(123321);

  res.send({ ...token });
});

export default router;
