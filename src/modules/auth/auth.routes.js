import { Router } from "express";
import { register, login } from "./auth.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import {
  registerValidator,
  loginValidator
} from "./auth.validator.js";

const router = Router();

router.post(
  "/register",
  validate(registerValidator),
  register
);

router.post(
  "/login",
  validate(loginValidator),
  login
);

export default router;
