import { AuthTypes } from "types/auth-user.type"

import { config } from "dotenv";

config();

type AuthData =
  | "CLIENT_ID"
  | "CLIENT_SECRET"
  | "CALLBACK_URL"
  | "API_URL";

const REQUIRED = [
  "DATABASE_HOST",
  "DATABASE_USER",
  "DATABASE_DATABASE",
  "DATABASE_PASSWORD",
  "DATABASE_DIALECT",
  
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_CALLBACK_URL",
  "GOOGLE_API_URL",
] as const;

type Required = (typeof REQUIRED)[number] | `${Uppercase<AuthTypes>}_${AuthData}`;

const KEYS = [
  ...REQUIRED,

  "PORT"
] as const;

type Keys = (typeof KEYS)[number];

class Env {
  private readonly _env = process.env;
  private readonly _keys = Object.keys(process.env);

  public constructor() {
    this.init();
  }

  public readonly get = <
    T extends boolean = false,
    Key extends T extends false
      ? Keys
      : string = T extends false
        ? Keys
        : string
  >(key: Key): Key extends Required ? string : string|false => {
    return (this._env[key] || false) as any
  }

  public get env() {
    return this._env;
  }

  private init() {
    for (const key of REQUIRED) {
      const keys = []

      if (!this._keys.includes(key)) {
        keys.push(key)
      };

      if (keys.length !== 0) {
        throw new Error(`keys in your .env are not defined. Define keys:\n${keys.join(", ")}`)
      };
    }
  }
}

export default Env;