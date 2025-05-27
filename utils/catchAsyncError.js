import mongoose from "mongoose";

export const catchAsyncError = (theFun, withTransaction = false) => {
  return async (req, res, next) => {
    let session = null;

    if (withTransaction) {
      session = await mongoose.startSession();
      session.startTransaction();
    }

    try {
      await theFun(req, res, next, session);
      if (session) await session.commitTransaction();
    } catch (err) {
      console.log("Entered catch block in catchAsyncError ----");
      if (session) await session.abortTransaction();
      next(err); // passes to global error handler
    } finally {
      if (session) session.endSession();
    }
  };
};
