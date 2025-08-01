import { AuthTypes } from "types/auth-user.type"

import { config } from "dotenv";

config();

type AuthData =
  | "CLIENT_ID"
  | "CLIENT_SECRET"
  | "CALLBACK_URL"
  | "API_URL";

const REQUIRED = [
  "CLIENT_URL",
  
  "DATABASE_HOST",
  "DATABASE_USER",
  "DATABASE_DATABASE",
  "DATABASE_PASSWORD",
  "DATABASE_DIALECT",
  
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_CALLBACK_URL",
  "GOOGLE_API_URL",

  "SESSION_SECRET"
] as const;

type Required = (typeof REQUIRED)[number] | `${Uppercase<AuthTypes>}_${AuthData}`;

const KEYS = [
  ...REQUIRED,

  "PORT",
  "COOKIE_MAX_AGE"
] as const;

type Keys = (typeof KEYS)[number];

type Unrequired = Exclude<Keys, Required>;
const DEFAULT: Record<Unrequired, string> = {
  PORT: "3001",
  COOKIE_MAX_AGE: "604800000"
};

type EnvType = Record<Keys, string>;

class Env {
  private readonly _env = process.env;
  private readonly _keys = Object.keys(process.env);

  public constructor() {
    this.init();
  }

  public get env(): EnvType {
    return { ...DEFAULT, ...this._env } as EnvType;
  }

  private init() {
    for (const key of REQUIRED) {
      const keys = [];

      if (!this._keys.includes(key)) {
        keys.push(key);
      }

      if (keys.length !== 0) {
        throw new Error(
          `keys in your .env are not defined. Define next keys:\n${keys.join(", ")}`
        );
      }
    }
  }
}

export default Env;
