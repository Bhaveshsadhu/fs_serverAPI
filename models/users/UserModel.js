import UsersSchema from "./UserSchema.js";

// C
export const InsertUser = (userObj) => {
  return UsersSchema(userObj).save();
};
//R

//U

//D
