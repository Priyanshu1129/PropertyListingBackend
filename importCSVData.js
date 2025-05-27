import fs from "fs";
import path from "path";
import csv from "csv-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Property from "./models/propertyModel.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const csvFilePath = path.join("./", "propertyDataset.csv");

const userIds = [
  "6835c37b23d72bf9ca81e560",
  "6835c902a7397736109a7aec",
  "6835c3eec02d365cb969d8b3",
];

const results = [];

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (data) => {
    try {
      const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
      results.push({
        propertyId: data.id,
        title: data.title,
        type: data.type,
        price: Number(data.price),
        state: data.state,
        city: data.city,
        areaSqFt: Number(data.areaSqFt),
        bedrooms: Number(data.bedrooms),
        bathrooms: Number(data.bathrooms),
        amenities: data.amenities.split("|"),
        furnished: data.furnished,
        availableFrom: new Date(data.availableFrom),
        listedBy: data.listedBy,
        tags: data.tags.split("|"),
        colorTheme: data.colorTheme,
        rating: parseFloat(data.rating),
        isVerified: data.isVerified.toLowerCase() === "true",
        listingType: data.listingType,
        createdBy: randomUserId,
      });
    } catch (err) {
      console.error("Error processing row:", err.message);
    }
  })
  .on("end", async () => {
    try {
      const inserted = await Property.insertMany(results);
      console.log(`Successfully imported ${inserted.length} properties.`);
      mongoose.connection.close();
    } catch (err) {
      console.error("Import failed:", err);
      mongoose.connection.close();
    }
  });
