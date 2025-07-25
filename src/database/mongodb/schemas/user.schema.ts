import mongoose, { Schema, SchemaTypes } from "mongoose";

import { SchemaParameters } from "../mongodb.types";
import { IUser } from "src/types/user.type";

const data: SchemaParameters<IUser> = {
  id: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true
  },
  
  username: { type: SchemaTypes.String, required: true, unique: true },
  nickname: { type: SchemaTypes.String, required: false, unique: false, default: undefined },
  
  created_at: { type: SchemaTypes.String, required: true, unique: false },
  avatar_url: { type: SchemaTypes.String, required: false }
} as const;
const schema = new Schema<IUser>(data);
const keys = Object.keys(data) as unknown as (keyof IUser)[];

const database = mongoose.model("users", schema);

export { schema as UserSchema, keys as UserKeys };

export default database;
