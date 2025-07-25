import Env from "env";

import sql, { Sequelize } from "sequelize";

const env = new Env();

const sequelize = new Sequelize(
  env.get("DATABASE_DATABASE"),
  env.get("DATABASE_USER"),
  env.get("DATABASE_PASSWORD"), {
  host: env.get("DATABASE_HOST"),
  dialect: env.get("DATABASE_DIALECT") as sql.Dialect
});

export default sequelize;
