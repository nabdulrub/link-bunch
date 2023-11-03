import express from "express";
import { AuthManager } from "../../managers/Auth.manager.js";
import { validationResult } from "express-validator";
import { signInValidator } from "../../entities/users/users.validator.js";
const router = express.Router();

router.get("/", signInValidator, (req, res) => {
  const auth = AuthManager();
  const errors = validationResult(req);
  if (errors.errors.length > 0) {
    console.log(errors);
    return res.send("Bad Info");
  }

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiVGh1IE5vdiAwMiAyMDIzIDIzOjUwOjUwIEdNVC0wNDAwIChFYXN0ZXJuIERheWxpZ2h0IFRpbWUpIiwiaWQiOjEyMzMyMSwiaWF0IjoxNjk4OTgzNDUwfQ.QoL02INhWoI0yeaAtSebllvqxQUp5Oisg4oBj_0rV_s";
  const verified = auth.verifyToken(token);

  res.send({ ...verified });
});

export default router;
