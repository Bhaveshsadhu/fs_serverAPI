import express from "express";
import {
  addTranscation,
  deleteTransctions,
  getAllTranscation,
  UpdateTranscation,
  MapData,
} from "../models/transcations/TranscationModel.js";
import TranscationSchema from "../models/transcations/TranscationSchema.js";

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

router.patch("/", async (req, res, next) => {
  try {
    const { _id,UserId } = req.body;
    const transcation = req.body;
    console.log(transcation);
    // return;
    const result = await UpdateTranscation(_id, transcation);
  console.log(result);
    result?._id
      ? res.json({
          status: "success",
          message: "Updated successfully",
          result,
        })
      : res.json({
          status: "error",
          message: "error While Update Transcation",
        });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res,next) => {
  try {
    // const userId = req.params.userId;
  const obj = req.body;
  const summary = await MapData(obj);

  res.json(summary);
  } catch (error) {
    next(error);
  }
  
});

 router.get("/summary/", async (req, res,next) => {
    
    try {
        const { _id } = req.userInfo;
    const result = (await getAllTranscation(_id)) || [];
        const summary = await TranscationSchema.aggregate([
          {
            $match: { UserId: _id }
          },
          {
            $group: {
              _id: {
                month: { $month: "$tdate" },
                type: "$type"
              },
              total: { $sum: "$amount" }
            }
          },
          {
            $sort: { "_id.month": 1 }
          }
        ]);
    
        // Optional: transform into chart-friendly format
        const formatted = summary.map(item => ({
          month: item._id.month,
          type: item._id.type,
          total: item.total
        }));
    
        res.json({ status: "success", data: formatted });
      } catch (error) {
        console.error("Summary Error:", error);
        res.status(500).json({ status: "error", message: "Failed to fetch summary data" });
      }
    });
// router.get("/summary", async (req, res) => {
//   try {
//     const { _id } = req.userInfo;

//     // Group by month + year + type
//     const summary = await TranscationSchema.aggregate([
//       {
//         $match: { UserId: _id }
//       },
//       {
//         $group: {
//           _id: {
//             month: { $month: "$tdate" },
//             year: { $year: "$tdate" },
//             type: "$type"
//           },
//           total: { $sum: "$amount" }
//         }
//       },
//       {
//         $sort: { "_id.year": 1, "_id.month": 1 }
//       }
//     ]);

//     // Transform to chart-friendly format
//     const income = [];
//     const expense = [];

//     summary.forEach(item => {
//       const date = new Date(item._id.year, item._id.month - 1).toLocaleString("default", {
//         month: "short",
//         year: "numeric"
//       });

//       if (item._id.type === "income") {
//         income.push({ date, amount: item.total });
//       } else if (item._id.type === "expense") {
//         expense.push({ date, amount: item.total });
//       }
//     });

//     res.json({
//       status: "success",
//       data: {
//         income,
//         expense
//       }
//     });
//   } catch (error) {
//     console.error("Summary Error:", error);
//     res.status(500).json({
//       status: "error",
//       message: "Failed to fetch summary data"
//     });
//   }
// });


export default router;
