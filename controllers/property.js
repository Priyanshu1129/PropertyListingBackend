import Property from "../models/propertyModel.js";
import redis from "../config/redisClient.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";
import { generateNextPropertyId } from "../utils/generatePropertyId.js";

const clearPropertyCache = async () => {
  const keys = await redis.keys("properties:*");
  if (keys?.length) await redis.del(keys);
};

export const createProperty = catchAsyncError(
  async (req, res, next, session) => {
    const newProperty = new Property({
      ...req.body,
      propertyId: await generateNextPropertyId(session),
      createdBy: req.userId,
    });

    const saved = await newProperty.save({ session });

    await clearPropertyCache();

    res.status(201).json(saved);
  },
  true
);

export const getPropertyById = catchAsyncError(
  async (req, res, next, session) => {
    const property = await Property.findById(req.params.id).session(session);

    if (!property) {
      const error = new Error("Property not found");
      error.statusCode = 404;
      return next(error);
    }

    res.json(property);
  }
);

export const updateProperty = catchAsyncError(
  async (req, res, next, session) => {
    const property = await Property.findById(req.params.id);
    if (!property) {
      const error = new Error("Property not found");
      error.statusCode = 404;
      return next(error);
    }

    if (property.createdBy.toString() !== req.userId) {
      const error = new Error("Unauthorized");
      error.statusCode = 403;
      return next(error);
    }

    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      session,
    });

    await clearPropertyCache();

    res.json(updated);
  },
  true
);

export const deleteProperty = catchAsyncError(
  async (req, res, next, session) => {
    const property = await Property.findById(req.params.id);
    if (!property) {
      const error = new Error("Property not found");
      error.statusCode = 404;
      return next(error);
    }

    if (property.createdBy.toString() !== req.userId) {
      const error = new Error("Unauthorized");
      error.statusCode = 403;
      return next(error);
    }

    await property.deleteOne({ session });

    await clearPropertyCache();

    res.json({ message: "Property deleted successfully" });
  },
  true
);

export const getPropertyList = catchAsyncError(async (req, res) => {
  const cacheKey = `properties:${JSON.stringify(req.query)}`;

  const cached = await redis.get(cacheKey);
  if (cached) {
    return res.json(JSON.parse(cached));
  }

  // Build Mongo query
  const query = {};
  if (req.query.type) query.type = req.query.type;
  if (req.query.state) query.state = req.query.state;
  if (req.query.city) query.city = req.query.city;
  if (req.query.bedrooms) query.bedrooms = Number(req.query.bedrooms);
  if (req.query.bathrooms) query.bathrooms = Number(req.query.bathrooms);
  if (req.query.furnished) query.furnished = req.query.furnished;
  if (req.query.listedBy) query.listedBy = req.query.listedBy;
  if (req.query.listingType) query.listingType = req.query.listingType;
  if (req.query.createdBy) query.createdBy = req.query.createdBy;
  if (req.query.minPrice || req.query.maxPrice) {
    query.price = {};
    if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
  }

  const results = await Property.find(query);

  // Cache the result for 10 minutes
  await redis.set(cacheKey, JSON.stringify(results), "EX", 600);

  res.json(results);
});
