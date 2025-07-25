import mongoose, { Schema } from "mongoose";
import { SchemaParameters } from "../mongodb.types";

import { IAuthUser } from "src/types/auth-user.type";

const data: SchemaParameters<IAuthUser> = {
  id: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true
  },
  
  service_id: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true
  },
  
  created_at: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false
  },
  
  profile_id: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false
  },
  
  access_token: {
    type: mongoose.SchemaTypes.String,
    required: true
  },
  
  refresh_token: {
    type: mongoose.SchemaTypes.String,
    required: false
  },
  
  type: {
    type: mongoose.SchemaTypes.String,
    required: true
  }
};
const schema = new Schema<IAuthUser>(data);
const keys = Object.keys(data) as unknown as (keyof IAuthUser)[];

const database = mongoose.model("auth", schema);

export { schema as AuthUsersSchema, keys as AuthUsersKeys };

export default database;
