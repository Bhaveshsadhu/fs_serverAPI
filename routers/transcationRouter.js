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
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const { _id } = req.userInfo;
    // console.log(req.userInfo);
    const result = (await getAllTranscation(_id)) || [];
    // console.log(result._id);
    const id = result.every((result) => result._id);
    // console.log(id);
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
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { _id } = req.userInfo;
    // req.body.UserId = _id;
    const IdsToDelete = req.body;
    console.log(_id, IdsToDelete);
    const result = await deleteTransctions(_id, IdsToDelete);
    console.log(result);
    res.json({
      status: "success",
      message: `${result.deletedCount} has been Deleted Successfully`,
      result,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
