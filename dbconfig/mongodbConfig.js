import mongoose from "mongoose";
const connStr = "mongodb://localhost:27017/finance_tracker";

export const DbConnect = async () => {
  try {
    const conn = await mongoose.connect(connStr);
    conn && console.log("DB Connected");
  } catch (error) {
    console.log("Error in DB connection");
  }
};
