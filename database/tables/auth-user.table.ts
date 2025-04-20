import { DataTypes, Model } from "sequelize";

import { AUTH_TYPES, IAuthUser, ICreateAuthUser } from "types/auth-user.type";
import Table from "../table";

const AuthUsers = new Table<Model<IAuthUser, ICreateAuthUser>>({
  name: "auth_users",
  attributes: {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
    },

    profile_id: {
      type: DataTypes.STRING
    },

    service_id: {
      type: DataTypes.STRING,
    },
    
    access_token: {
      type: DataTypes.STRING,
    },

    refresh_token: {
      type: DataTypes.STRING,
    },

    created_at: {
      // ISO format
      type: DataTypes.STRING,
    },

    type: {
      type: DataTypes.STRING,
      values: AUTH_TYPES
    }
  }
});

export { AuthUsers };

export default AuthUsers;
