import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  try {
    console.log("req.cookies", req.cookies);
    console.log("req.cookies.refreshToken", req.cookies.refreshToken);
    const accessToken = req.cookies?.accessToken || req.headers?.authorization?.replace("Bearer ", "");
    console.log("accessToken", accessToken);

    if (!accessToken) {
      throw new ApiError(401, "Unauthorized - No access token provided");
    }

    let userDecoded;
    try {
      userDecoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new ApiError(401, "Unauthorized - Access token expired");
      }

      throw new ApiError(401, "Unauthorized - Invalid access token");

    }

    // const userDecoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);


    const user = await User.findById(userDecoded._id).select("-password -refreshToken");

    if (!user) {
      throw new ApiError(401, "Invalid access token or user not found");
    }

    req.user = user;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Unauthorized - Access token expired");
    }
    if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, "Unauthorized - Invalid access token");
    }
    throw new ApiError(500, "Internal server error")
  }
});

export { authMiddleware };
