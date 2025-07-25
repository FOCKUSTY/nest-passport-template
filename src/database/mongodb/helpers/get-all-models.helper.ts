import mongoose from "mongoose";

export const getAllModels = async () => {
  try {
    const models = mongoose.modelNames();

    if (!models)
      return new Error("Возможно таблиц не существует");

    return models;
  } catch (err) {
    console.error(err);

    return err;
  }
};

export default getAllModels;
