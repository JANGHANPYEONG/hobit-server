import { Document, model, Schema } from "mongoose";
import { IUser } from "./User";

/**
 * Profile type definition
 */
export type TProfile = {
  user: IUser["_id"];
  firstName: string;
  lastName: string;
  username: string;
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
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
});

const Profile = model<IProfile>("Profile", profileSchema);

export default Profile;
