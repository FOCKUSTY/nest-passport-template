import mongoose from "mongoose";

export const deleteModel = async (name: string) => {
  try {
    const data = mongoose.deleteModel(name);

    return data
  } catch (err) {
    console.log(err);

    return new Error(`${err}`);
  }
};

export default deleteModel;
