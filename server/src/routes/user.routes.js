import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";
import { profileUser } from "../controllers/user.controller.js";
import { logoutUser } from "../controllers/user.controller.js";
import { refreshAccessToken } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createBlog } from "../controllers/blogs.controller.js";
import { getBlogs } from "../controllers/blogs.controller.js";
import { toggleLike } from "../controllers/blogs.controller.js";
const router = Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/signup").post(registerUser);
router.route("/profile").get(authMiddleware, profileUser);
router.route("/logout").post(authMiddleware, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/blogs").get(authMiddleware, getBlogs);
router.route("/create-blog").post(authMiddleware, createBlog);
router.route("/toggle-like").post(authMiddleware, toggleLike);
export default router;





