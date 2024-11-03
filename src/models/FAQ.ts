import { Document, model, Schema, Types } from "mongoose";

/**
 * FAQ type definition
 */
export type TFAQ = {
  mainCategory: { ko: string; en: string };
  subCategory: { ko: string; en: string };
  question: { ko: string; en: string };
  answer: { ko: string[]; en: string[] };
  createdBy: Types.ObjectId;
  createdAt?: Date;
  lastModifiedAt?: Date;
  lastModifiedBy?: Types.ObjectId; // Optional, initially null
};

/**
 * FAQ document interface extending Mongoose Document
 */
export interface IFAQ extends TFAQ, Document {}

/**
 * FAQ schema definition
 */
const faqSchema: Schema = new Schema({
  mainCategory: {
    ko: { type: String, required: true },
    en: { type: String, required: true },
  },
  subCategory: {
    ko: { type: String, required: true },
    en: { type: String, required: true },
  },
  question: {
    ko: { type: String, required: true },
    en: { type: String, required: true },
  },
  answer: {
    ko: { type: [String], required: true },
    en: { type: [String], required: true },
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  lastModifiedAt: { type: Date, default: Date.now },
  lastModifiedBy: { type: Schema.Types.ObjectId, ref: "User", default: null }, // Optional field, default: null
});

const FAQ = model<IFAQ>("FAQ", faqSchema);

export default FAQ;
