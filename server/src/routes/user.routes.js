import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";
import { profileUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(authMiddleware, profileUser);
export default router;





