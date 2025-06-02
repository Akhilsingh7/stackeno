import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  try {
    console.log("Auth middleware started");
    console.log("Cookies:", req.cookies);

    const accessToken = req.cookies?.accessToken || req.headers?.authorization?.replace("Bearer ", "");

    console.log("accessToken", accessToken);
    if (!accessToken) {
        throw new ApiError(401, "Unauthorized - No access token provided");
    }

    const userDecoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded token:", userDecoded);

    const user = await User.findById(userDecoded._id).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(401, "Invalid access token or user not found");
    }

    req.user = user;
    console.log("User authenticated:", user);

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    throw new ApiError(401, error.message || "Invalid access token");
  }
});

export { authMiddleware };
