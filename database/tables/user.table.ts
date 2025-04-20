import { DataTypes, Model } from "sequelize";

import { ICreateUser, IUser } from "types/user.type";
import Table from "../table";

const Users = new Table<Model<IUser, ICreateUser>>({
  name: "users",
  attributes: {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
    },

    username: {
      type: DataTypes.STRING,
    },

    nickname: {
      type: DataTypes.STRING,
    },

    avatar_url: {
      type: DataTypes.STRING,
    },

    created_at: {
      // ISO format
      type: DataTypes.STRING,
    }
  }
});

export { Users };

export default Users;
