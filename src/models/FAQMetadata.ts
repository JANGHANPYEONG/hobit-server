import { Document, model, Schema, Types } from "mongoose";

/**
 * FAQ metadata type definition
 */
export type TFAQMetadata = {
  faqId: Types.ObjectId; // Reference to FAQ
  searchDate: Date;
  searchCount: number;
  feedbackScores: number[]; // Array to store feedback ratings (1-5)
};

/**
 * FAQ metadata document interface
 */
export interface IFAQMetadata extends TFAQMetadata, Document {}

/**
 * FAQ metadata schema definition
 */
const faqMetadataSchema: Schema = new Schema({
  faqId: { type: Schema.Types.ObjectId, ref: "FAQ", required: true },
  searchDate: { type: Date, required: true },
  searchCount: { type: Number, default: 0 },
  feedbackScores: { type: [Number], default: [] }, // Stores feedback ratings from users
});

const FAQMetadata = model<IFAQMetadata>("FAQMetadata", faqMetadataSchema);

export default FAQMetadata;
