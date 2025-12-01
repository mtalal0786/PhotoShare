// models/Photo.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPhoto extends Document {
  creatorId: mongoose.Types.ObjectId;
  title: string;
  caption: string;
  location: string;
  people: string[];
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const PhotoSchema = new Schema<IPhoto>(
  {
    creatorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    caption: { type: String, default: "" },
    location: { type: String, default: "" },
    people: { type: [String], default: [] },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export const Photo: Model<IPhoto> =
  mongoose.models.Photo || mongoose.model<IPhoto>("Photo", PhotoSchema);
