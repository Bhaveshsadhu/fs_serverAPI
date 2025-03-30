import express from "express";
import { GetUser, InsertUser } from "../models/users/UserModel.js";
import { hashPassword, MatchPassword } from "../utils/bcryptpassword.js";
import { signJwt } from "../utils/jwt.js";

const router = express.Router();

// user signup
router.post("/signup", async (req, res, next) => {
  try {
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
    let msg = error.message;
    if (msg.includes("Error E11000 duplicate key error collection")) {
      msg = "User Already Exists!!";
    }
    res.json({
      status: "error",
      message: msg,
    });
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
      res.json({
        status: "success",
        message: "Login Success!!",
        user,
        token,
      });
      return;
    }
    // if email and password dosent match or not found
    res.json({
      status: "error",
      message: "Wrong Credentials",
    });
    return;
  } catch (error) {
    res.json({
      status: error,
      message: error.message,
    });
  }
});

export default router;
