import { Document, model, Schema } from "mongoose";
import { IUser } from "./User";

/**
 * Profile type definition
 */
export type TProfile = {
  user: IUser["_id"];
  name: string;
  department: string;
  phoneNumber: string;
};

/**
 * Profile document interface extending Mongoose Document
 */
export interface IProfile extends TProfile, Document {}

/**
 * Profile schema definition
 */
const profileSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  department: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Profile = model<IProfile>("Profile", profileSchema);

export default Profile;
