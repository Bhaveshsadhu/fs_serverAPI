import bcrypt from "bcryptjs";

const saltNumber = 15;

export const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, saltNumber);
};
export const MatchPassword = (plainPassword, hashPassword) => {
  return bcrypt.compareSync(plainPassword, hashPassword);
};
