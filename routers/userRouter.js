import express from "express";
import { GetUser, InsertUser } from "../models/users/UserModel.js";
import { hashPassword, MatchPassword } from "../utils/bcryptpassword.js";
import { signJwt, verifyJWTToken } from "../utils/jwt.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

// user signup
router.post("/signup", async (req, res, next) => {
  try {
    // Validate the Password
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(req.body.password)) {
       return res.json({
        status: "error",
        message: "Password must be at least 8 characters long and include at least one number and one special character.",
      });
    }
    
    
    // encrypt Password
    req.body.password = hashPassword(req.body.password);
    const user = await InsertUser(req.body);
    user?._id
      ? res.json({
          status: "success",
          message: "User Created, You may login now!!!",
        })
      : res.json({
          status: "error",
          message: "Error while creating User, Please try again Later",
        });
  } catch (error) {
    
    if (error.message.includes("Error E11000 duplicate key error collection")) {
      error.message = "User Already Exists!!";
    }
    error.statusCode = 200;
    next(error);
    
  }
});

// User Login
router.post("/login", async (req, res, next) => {
  try {
    // should get email and password
    const { email, password } = req.body;
    // email must be exists
   
    const user = await GetUser(email);
    
    // if email found and password matched
    if (user?._id && MatchPassword(password, user.password)) {
      const token = signJwt({ email: email });
      user.password = undefined;

      return res.json({
        status: "success",
        message: "Login Success!!",
        user,
        token,
      });
    }
    // if email and password dosent match or not found
    return res.json({
      status: "error",
      message: "Wrong Credentials",
    });
    return;
  } catch (error) {
    next(error);
  }
});

router.get("/", auth, (req, res, next) => {
  try {
    const user = req.userInfo;
    
    return res.json({
      status: "success",
      message: "Here is the user Profile",
      user,
    });
  } catch (error) {
    
    next(error);
  }
});

export default router;
