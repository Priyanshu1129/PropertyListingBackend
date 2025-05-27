import User from "../models/userModel.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";
import Property from "../models/propertyModel.js";

export const getMyProfile = catchAsyncError(async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    return next(error);
  }
  res.json(user);
});

export const findUserByEmail = catchAsyncError(async (req, res) => {
  const { email } = req.query;

  if (!email) {
    const error = new Error("Email is required");
    error.statusCode = 400;
    return next(error);
  }

  const user = await User.findOne({ email }).select("_id name email");
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    return next(error);
  }

  res.json(user);
});

export const recommendProperty = catchAsyncError(async (req, res, next) => {
  const recipientId = req.params.userId;
  const { propertyId } = req.body;
  const recommendedBy = req.userId;

  if (!propertyId) {
    const error = new Error("Property ID is required");
    error.statusCode = 400;
    return next(error);
  }

  const property = await Property.findById(propertyId);
  if (!property) {
    const error = new Error("Property not found");
    error.statusCode = 404;
    return next(error);
  }

  const recipient = await User.findById(recipientId);
  if (!recipient) {
    const error = new Error("Recipient user not found");
    error.statusCode = 404;
    return next(error);
  }

  const alreadyRecommended = recipient.recommendedProperties.some(
    (item) =>
      item.property.toString() === propertyId &&
      item.recommendedBy.toString() === recommendedBy
  );

  if (alreadyRecommended) {
    const error = new Error("Property already recommended to this user");
    error.statusCode = 409;
    return next(error);
  }

  recipient.recommendedProperties.push({
    property: propertyId,
    recommendedBy,
  });

  await recipient.save();

  res.json({ message: "Property recommended successfully" });
});
