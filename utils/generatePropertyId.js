import Counter from "../models/propertyCounterModel.js";

export const generateNextPropertyId = async (session) => {
  const result = await Counter.findByIdAndUpdate(
    { _id: "propertyId" },
    { $inc: { seq: 1 } },
    { upsert: true, new: true }
  ).session(session);
  return `PROP${result.seq}`;
};
