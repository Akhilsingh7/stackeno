import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
    const { email, username, password, position } = req.body;

    if (!email || !username || !password || !position) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existingUser) {
        throw new ApiError(400, "User already exists with this email or username");
    }

    try {
        const user = await User.create({
            email,
            username: username.toLowerCase(),
            password,
            position
        });

        const createdUser = await User.findById(user._id).select("-password -refreshToken");

        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while creating the user");
        }

        return res.status(201).json(
            new ApiResponse(201, createdUser, "User registered successfully")
        );
    } catch (error) {

        throw new ApiError(500, "Error creating user: " + error.message);
    }
});

export { registerUser };