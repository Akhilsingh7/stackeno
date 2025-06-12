import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  try {

    const accessToken = req.cookies?.accessToken || req.headers?.authorization?.replace("Bearer ", "");


    if (!accessToken) {
        throw new ApiError(401, "Unauthorized - No access token provided");
    }

    const userDecoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);


    const user = await User.findById(userDecoded._id).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(401, "Invalid access token or user not found");
    }

    req.user = user;

    next();
  } catch (error) {
    throw new ApiError(401, error.message || "Invalid access token");
  }
});

export { authMiddleware };
