import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false }); // save the user with the refresh token

        return { accessToken, refreshToken };

    } catch (error) {
        throw new ApiError(500, "Error generating access token and refresh token");
    }
}

const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

 if(!refreshToken){
    throw new ApiError(401, "Unauthorized - No refresh token provided");
 }

 const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

 if(!decoded){
    throw new ApiError(401, "Unauthorized - Invalid refresh token");
 }

 const user = await User.findById(decoded._id);

 if(!user){
    throw new ApiError(401, "Unauthorized - User not found");
 }

 if(user.refreshToken !== refreshToken){
    throw new ApiError(401, "Unauthorized - Invalid refresh token");
 }

 const {accessToken , refreshToken:newRefreshToken} = await generateAccessAndRefreshToken(user._id);

 const options = {
    httpOnly: true,
    secure: true,
 }

 return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken",newRefreshToken, options).json(
    new ApiResponse(200, {
        accessToken,
    }, "tokens refreshed successfully")
 );
 
}); 

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

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(400, "User not found");
    }


    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
    } // this will make the cookie secure and httpOnly and editable by the server only not the client


    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, {
                user: loggedInUser,
                accessToken,
                refreshToken
            }, "User logged in successfully")
        );

});

const profileUser = asyncHandler(async (req, res) => {
    const user = req.user;

    if (!user) {
        throw new ApiError(401, "Unauthorized or User not found");
    }

    return res.status(200).json(
        new ApiResponse(200, user, "User profile fetched successfully")
    );
    // throw new ApiError(401, "Unauthorized or User not foundsss");
});

const logoutUser = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {$unset: {refreshToken:1 }},
        {new: true}
    );

    const options = {
        httpOnly: true,
        secure: true,
    }

    res.clearCookie("accessToken", options);
    res.clearCookie("refreshToken", options);

    return res.status(200).json(
        new ApiResponse(200, null, "User logged out successfully")
    );
});



export { registerUser, loginUser, profileUser, logoutUser, refreshAccessToken};