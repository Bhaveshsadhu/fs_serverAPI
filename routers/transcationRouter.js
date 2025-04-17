import express from "express";
import {
  addTranscation,
  deleteTransctions,
  getAllTranscation,
} from "../models/transcations/TranscationModel.js";

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
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const { _id } = req.userInfo;
   
    const result = (await getAllTranscation(_id)) || [];
    
    const id = result.every((result) => result._id);
    
    id
      ? res.json({
          status: "success",
          message: "All Transcation Fetched for Specific User",
          result,
        })
      : res.json({
          status: "error",
          message: "Error While fetching all Transcation",
        });
  } catch (error) {
    next(error);
  }
});

router.delete("/", async (req, res) => {
  try {
    const { _id } = req.userInfo;
    
    const IdsToDelete = req.body;
    
    const result = await deleteTransctions(_id, IdsToDelete);
   
  } catch (error) {
    next(error);
  }
});

export default router;
