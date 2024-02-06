import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validation-not empity
  // check if already exist :using username or email or both
  //check for images, check for avtar
  //upload them to cloudinary , check avtar in cloudinary
  //create user object- create entry in db
  //remove password and refresh token field from response
  //check for user creation
  //return res

  // 1
  const { username, fullname, email, password } = req.body;
  console.log("email", email);
  //    if(fullname===""){
  //     throw new ApiError(400,"fullname is  required");
  //    }
  // or advanced method check all in once line
  if (
    [fullname, email, username, password].some((field) => field?.trim == "")
  ) {
    throw new ApiError(400, "All field are required");
  }
  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "Username and Password is already existed...");
  }
  //for avatar image
  const avatarLocalPath = req.files?.avatar[0]?.path; // geting the filepath to multer that store file temorerly
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  //   now upload on upload on cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  //send data into database create user object
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  const createdUser = User.findById(user._id) //_id is created by mongodb
    .select("-password -refreshToken"); // by default all field are select but here we deselect some field that arer give in this string with - sign
  if (!createdUser) {
    throw new ApiError(500, "somthing went wrong while registering user");
  }

  //seneding response
  return res.this.status(201).json(
    new ApiResponse(200,createdUser,"User Registered Successfully")
  )
});

export { registerUser };
