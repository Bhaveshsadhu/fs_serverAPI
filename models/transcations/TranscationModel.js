import TranscationSchema from "./TranscationSchema.js";

export const addTranscation = (obj) => {
  return TranscationSchema(obj).save();
};
export const getAllTranscation = (UserId) => {
  if (!UserId) {
    throw new error("userId is required!!");
  }
  return TranscationSchema.find({ UserId });
};
export const deleteTransctions = (UserId, Ids) => {
  return TranscationSchema.deleteMany({ UserId, _id: { $in: Ids } });
};
