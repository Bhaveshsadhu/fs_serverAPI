import express from "express";
import router from "./routers/userRouter.js";
import transcationRouter from "./routers/transcationRouter.js";
import { DbConnect } from "./dbconfig/mongodbConfig.js";
import cors from "cors";
import { auth } from "./middleware/authMiddleware.js";
import dotenv from 'dotenv';
import { errorHandler } from "./middleware/errorHandlerMiddleware.js";
// import mapRouter from "./routers/mapRouter.js";

const app = express();
const PORT = process.env.PORT || 8000;
dotenv.config();

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
app.use("/api/v1/transcations", auth, transcationRouter);
// app.use("/api/v1/transcations", auth, mapRouter);


// 404 Error Handle
app.use((req,res,next)=>{
  const error = new Error("Not Found");
  error.statusCode = 404;
  next(error);
})
// Global Error Handler
app.use(errorHandler);