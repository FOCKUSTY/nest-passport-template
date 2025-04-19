import { config } from "dotenv";

config();

const KEYS = [
  "DATABASE_HOST",
  "DATABASE_USER",
  "DATABASE_DATABASE",
  "DATABASE_PASSWORD",
  "DATABASE_DIALECT",

  "PORT"
] as const;

const REQUIRED = [
  "DATABASE_HOST",
  "DATABASE_USER",
  "DATABASE_DATABASE",
  "DATABASE_PASSWORD",
  "DATABASE_DIALECT",
  
  "PORT"
] as const;

class Env {
  private readonly _env = process.env;
  private readonly _keys = Object.keys(process.env);

  public constructor() {
    this.init();
  }

  public readonly get = <
    T extends boolean = false,
    Key extends T extends false
      ? (typeof KEYS)[number]
      : string = T extends false
        ? (typeof KEYS)[number]
        : string
  >(key: Key): Key extends (typeof REQUIRED)[number] ? string : string|false => {
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