import AuthUsers from "./tables/auth-user.table";
import Users from "./tables/user.table";

class Database {
  public readonly AuthUsers = AuthUsers;
  public readonly Users = Users;

  public constructor() {};
}

export default Database;
