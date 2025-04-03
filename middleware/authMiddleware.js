import { GetUser } from "../models/users/UserModel.js";
import { verifyJWTToken } from "../utils/jwt.js";

export const auth = async (req, res, next) => {
  try {
    //1.get token

    const { authorization } = req.headers;
    //2.validate if the token is valid
    const verifyToken = verifyJWTToken(authorization);

    //3.get useremail from token
    if (verifyToken?.email) {
      const user = await GetUser(verifyToken.email);

      //   verify email exists with _id
      if (user?._id) {
        // creating new property inside req like req.userInfo
        req.userInfo = user;
        user.password = undefined;
        return next();
      }
    }
    res.status(403).json({
      error: "Unautorized",
    });
  } catch (error) {
    res.json({
      error: "error",
      message: error.message,
    });
  }
};
