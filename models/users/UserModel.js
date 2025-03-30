import UsersSchema from "./UserSchema.js";

// C
export const InsertUser = (userObj) => {
  return UsersSchema(userObj).save();
};
//R
export const GetUser = (email) => {
  return UsersSchema.findOne({ email });
};
//U

//D
