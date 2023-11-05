import { body } from "express-validator";

export const registerValidator = [
  body("email", "Cannot be empty").isString().notEmpty(),
  body("password", "Cannot be empty").isString().notEmpty(),
];

export const signInValidator = [
  body("email", "Cannot be empty").isString().notEmpty(),
  body("password", "Cannot be empty").isString().notEmpty(),
];
