import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";
import { profileUser } from "../controllers/user.controller.js";
import { logoutUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/signup").post(registerUser);
router.route("/profile").get(authMiddleware, profileUser);
router.route("/logout").post(authMiddleware, logoutUser);
export default router;





