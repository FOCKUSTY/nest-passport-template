import type { Model as ModelType } from "mongoose";
import { FindOptions } from "../mongodb.types";

export const getData = async <T>(
  Model: ModelType<T>,
  options: FindOptions<T>
) => {
  try {
    const data = await Model.find(options.filter, options.projection, options.options);

    if (!data || data.length === 0) return new Error("Возможно, таблиц не существует");

    return data;
  } catch (err) {
    console.error(err);

    return new Error(`${err}`);
  }
};

export default getData;
