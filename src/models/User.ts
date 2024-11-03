import { Document, model, Schema } from "mongoose";

/**
 * User type definition
 */
export type TUser = {
  email: string;
  password: string;
};

/**
 * User document interface extending Mongoose Document
 */
export interface IUser extends TUser, Document {}

/**
 * User schema definition
 */
const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const User = model<IUser>("User", userSchema);

export default User;
