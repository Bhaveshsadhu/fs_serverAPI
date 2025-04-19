import mongoose from "mongoose";
const connStr = process.env.MONGO_URL;

export const DbConnect = async () => {
  try {
    const conn = await mongoose.connect(connStr);
    conn && console.log("DB Connected");
  } catch (error) {
    console.log("Error in DB connection");
  }
};
