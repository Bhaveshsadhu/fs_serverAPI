import express from "express";
import { InsertUser } from "../models/users/UserModel.js";
import { hashPassword } from "../utils/bcryptpassword.js";

const router = express.Router();

// user signup
router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    // encrypt Password
    req.body.password = hashPassword(req.body.password);
    console.log(req.body.password);
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

export default router;
