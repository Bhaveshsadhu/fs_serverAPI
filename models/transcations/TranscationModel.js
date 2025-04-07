import TranscationSchema from "./TranscationSchema.js";

export const addTranscation = (obj) => {
  return TranscationSchema(obj).save();
};
