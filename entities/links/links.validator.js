import { body } from "express-validator";

export const linkValidator = [
  body("link", "Cannot be empty").isString().notEmpty(),
  body("platform", "Cannot be empty").isString().notEmpty(),
  body("userId", "Cannot be empty").isString().notEmpty(),
];
