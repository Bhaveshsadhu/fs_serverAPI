import express from "express";
import { addTranscation } from "../models/transcations/TranscationModel.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { _id } = req.userInfo;
    req.body.UserId = _id;
    const transcation = req.body;
    const result = await addTranscation(transcation);

    result?._id
      ? res.json({
          status: "success",
          message: "New Transcation Added Successfully",
          result,
        })
      : res.json({
          status: "error",
          message: "error While adding Transcation",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
