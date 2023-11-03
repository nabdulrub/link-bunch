import { body } from "express-validator";

export const registerValidator = [
  body("username", "Cannot be empty").isString().notEmpty(),
  body("password", "Cannot be empty")
    .isString()
    .notEmpty()
    .isStrongPassword({ minLength: 8, minUppercase: 1, minSymbols: 0 }),
];

export const signInValidator = [
  body("username", "Cannot be empty").isString().notEmpty(),
  body("password", "Cannot be empty").isString().notEmpty(),
];
