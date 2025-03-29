import express from "express";
import router from "./routers/userRouter.js";
import { DbConnect } from "./dbconfig/MongoDBconfig.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

// DB connnection
DbConnect();

// Middlewares
app.use(cors());
app.use(express.json());

// Listen Method
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server is running at http://localhost:${PORT}`);
});

// API EndPoints for User Routers
app.use("/api/v1/users", router);
