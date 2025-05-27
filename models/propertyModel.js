import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    propertyId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Apartment", "Villa", "Bungalow", "Penthouse", "Studio"],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    areaSqFt: {
      type: Number,
      required: true,
      min: 0,
    },
    bedrooms: {
      type: Number,
      default: 1,
      min: 0,
    },
    bathrooms: {
      type: Number,
      default: 1,
      min: 0,
    },
    amenities: {
      type: [String],
      default: [],
    },
    furnished: {
      type: String,
      enum: ["Furnished", "Unfurnished", "Semi"],
      required: true,
    },
    availableFrom: {
      type: Date,
      required: true,
    },
    listedBy: {
      type: String,
      enum: ["Owner", "Builder", "Agent"],
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    colorTheme: {
      type: String,
      match: /^#[0-9a-fA-F]{6}$/,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    listingType: {
      type: String,
      enum: ["sale", "rent"],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Property", propertySchema);
