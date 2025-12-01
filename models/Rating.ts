// models/Rating.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRating extends Document {
  photoId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  value: number;
  createdAt: Date;
  updatedAt: Date;
}

const RatingSchema = new Schema<IRating>(
  {
    photoId: { type: Schema.Types.ObjectId, ref: "Photo", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    value: { type: Number, min: 1, max: 5, required: true },
  },
  { timestamps: true }
);

RatingSchema.index({ photoId: 1, userId: 1 }, { unique: true });

export const Rating: Model<IRating> =
  mongoose.models.Rating || mongoose.model<IRating>("Rating", RatingSchema);
