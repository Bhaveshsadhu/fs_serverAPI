import express, { Router } from "express";

const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server is running at http://localhost:${PORT}`);
});

app.use(express.json());
// app.get("/",Router)
